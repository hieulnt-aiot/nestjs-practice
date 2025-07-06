import { DataSource } from 'typeorm';
import { User } from '../domain/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'task_management',
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
