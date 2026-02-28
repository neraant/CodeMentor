import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Request, Response } from 'express';
import { Public } from '@/common/decorators/public.decorator';

const JWT_REFRESH_EXPIRES = 604800;
const MIL_IN_SEC = 1000;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.register(
      body.email,
      body.password,
      body.role,
      body.name,
    );

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge:
        (this.configService.get<number>('JWT_REFRESH_EXPIRES') ??
          JWT_REFRESH_EXPIRES) * MIL_IN_SEC,
    });

    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(body.email, body.password);

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge:
        (this.configService.get<number>('JWT_REFRESH_EXPIRES') ??
          JWT_REFRESH_EXPIRES) * MIL_IN_SEC,
    });

    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Post('refresh')
  async refresh(@Req() request: Request) {
    const refreshToken = request.cookies['refreshToken'] as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  async logout(@Req() request: Request) {
    const refreshToken = request.cookies['refreshToken'] as string;
    const accessToken = request.headers.authorization?.split(' ')[1] ?? '';

    if (!refreshToken || !accessToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return this.authService.logout(refreshToken, accessToken);
  }
}
