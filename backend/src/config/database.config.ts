import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('POSTGRESS_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  synchronize: configService.get('NODE_ENV') === 'development',

  logging: configService.get('NODE_ENV') === 'development',
});
