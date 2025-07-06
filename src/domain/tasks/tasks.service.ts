import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepo: TaskRepository) {}

  create(dto: CreateTaskDto) {
    return this.taskRepo.save(dto);
  }

  findAll(filter: FilterTaskDto) {
    return this.taskRepo.getFilteredTasks(filter);
  }

  findOne(id: number) {
    return this.taskRepo.findOneBy({ id });
  }

  async attachFile(id: string, file: Express.Multer.File) {
    const task = await this.taskRepo.findOneBy({ id: Number(id) });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.filePath = file.path;
    return this.taskRepo.save(task);
  }
}
