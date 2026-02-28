import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { JwtPayload } from '@/common/types/jwt-payload.type';
import { blacklistKey, refreshKey } from '@/common/utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSevice: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async register(
    email: string,
    password: string,
    role: UserRole,
    name: string,
  ) {
    const user = await this.usersSevice.findByEmail(email);

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: Partial<User> = {
      email,
      passwordHash,
      role,
      name,
    };

    const newCreatedUser = await this.usersSevice.create(newUser);

    const tokens = this.generateTokens(newCreatedUser.id, role);

    const refreshTtl = this.configService.get<number>('JWT_REFRESH_EXPIRES');

    await this.redisService.set(
      refreshKey(newCreatedUser.id),
      tokens.refreshToken,
      refreshTtl,
    );

    return tokens;
  }

  async login(email: string, password: string) {
    const user = await this.usersSevice.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const isPasswordTheSame = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordTheSame) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const tokens = this.generateTokens(user.id, user.role);

    const refreshTtl = this.configService.get<number>('JWT_REFRESH_EXPIRES');

    await this.redisService.set(
      refreshKey(user.id),
      tokens.refreshToken,
      refreshTtl,
    );

    return tokens;
  }

  async logout(refreshToken: string, accessToken: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const decodedRefresh = this.jwtService.decode(refreshToken) as JwtPayload;

    const userId = decodedRefresh?.sub;
    await this.redisService.del(refreshKey(userId));

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const decoded = this.jwtService.decode(accessToken) as JwtPayload;
    const ttl = decoded.exp - Math.floor(Date.now() / 1000);
    if (ttl > 0) {
      await this.redisService.set(blacklistKey(accessToken), true, ttl);
    }

    return true;
  }

  async refresh(refreshToken: string) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const decoded = this.jwtService.decode(refreshToken) as JwtPayload;

    const userId = decoded?.sub;

    const storedToken = await this.redisService.get<string>(refreshKey(userId));

    if (refreshToken !== storedToken) {
      throw new UnauthorizedException('Session is expired');
    }

    const payload = this.jwtService.verify<{
      sub: string;
      role: UserRole;
    }>(storedToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const tokens = this.generateTokens(payload.sub, payload.role);

    const refreshTtl = this.configService.get<number>('JWT_REFRESH_EXPIRES');

    await this.redisService.set(
      refreshKey(userId),
      tokens.refreshToken,
      refreshTtl,
    );

    return tokens;
  }

  generateTokens(
    userId: string,
    role: UserRole,
  ): {
    refreshToken: string;
    accessToken: string;
  } {
    const accessToken = this.jwtService.sign(
      { sub: userId, role },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: Number(this.configService.get('JWT_ACCESS_EXPIRES')),
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, role },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRES'),
      },
    );

    return { accessToken, refreshToken };
  }
}
