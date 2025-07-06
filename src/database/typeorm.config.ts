import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../domain/users/entities/user.entity';
import { Task } from '../domain/tasks/entities/task.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'admin123',
  database: process.env.DATABASE_NAME || 'task_management',
  entities: [User, Task],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
