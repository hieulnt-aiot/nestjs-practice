import { DataSource, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Injectable } from '@nestjs/common';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getFilteredTasks(filter: FilterTaskDto) {
    const { search, isCompleted, page = 1, limit = 10 } = filter;

    const query = this.createQueryBuilder('task');

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        {
          search: `%${search}%`,
        }
      );
    }

    if (isCompleted !== undefined) {
      query.andWhere('task.isCompleted = :isCompleted', { isCompleted });
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total, page, limit };
  }
}
