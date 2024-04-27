import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: configService.get('NODE_ENV') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsRun: false,
  migrationsTableName: 'migrations',
});
