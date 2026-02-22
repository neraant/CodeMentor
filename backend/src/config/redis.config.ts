import { ConfigService } from '@nestjs/config';

export const getRedisConfig = (configService: ConfigService) => ({
  host: configService.get<string>('REDIS_HOST'),
  port: configService.get<number>('REDIS_PORT'),
});
