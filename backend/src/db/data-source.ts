import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { dataSourceOptions } from '@/config/typeorm.config';

const dataSource = new DataSource({
  ...dataSourceOptions,
  seeds: ['src/db/seeds/**/*.ts'],
} as typeof dataSourceOptions & SeederOptions);

export default dataSource;
