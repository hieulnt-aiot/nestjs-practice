import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly taskRepo: TaskRepository) {}

  create(dto: CreateTaskDto) {
    this.logger.log(`Creating task: ${dto.title}`);
    return this.taskRepo.save(dto);
  }

  findAll(filter: FilterTaskDto) {
    this.logger.debug(`Fetching tasks with filters: ${JSON.stringify(filter)}`);
    return this.taskRepo.getFilteredTasks(filter);
  }

  findOne(id: number) {
    this.logger.debug(`Fetching task ID: ${id}`);
    return this.taskRepo.findOneBy({ id });
  }

  async attachFile(id: string, file: Express.Multer.File) {
    this.logger.log(`Attaching file to task ID: ${id}`);
    const task = await this.taskRepo.findOneBy({ id: Number(id) });
    if (!task) {
      this.logger.warn(`Task not found with ID: ${id}`);
      throw new NotFoundException('Task not found');
    }

    task.filePath = file.path;
    this.logger.log(`File attached: ${file.path}`);
    return this.taskRepo.save(task);
  }
}
