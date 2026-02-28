import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import Redis, { Redis as RedisType } from 'ioredis';

@Injectable()
export class RedisService {
  private client: RedisType;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      password: this.configService.get<string>('REDIS_PASSWORD') || undefined,
      tls: this.configService.get('NODE_ENV') === 'production' ? {} : undefined,
    });
  }

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttlSeconds?: number) {
    const data = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, data, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, data);
    }
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
