import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
} as DataSourceOptions;

export default new DataSource(dataSourceOptions);
