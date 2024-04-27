import { registerAs } from '@nestjs/config';

interface DatabaseConfig {
  type: 'postgres';
  url: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  synchronize: boolean;
  migrations: string[];
  migrationsRun: boolean;
  migrationsTableName: string;
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    type: 'postgres',
    url: process.env.DATABASE_URL || '',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_NAME || '',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: process.env.NODE_ENV === 'development',
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    migrationsRun: false,
    migrationsTableName: 'migrations',
  }),
);
