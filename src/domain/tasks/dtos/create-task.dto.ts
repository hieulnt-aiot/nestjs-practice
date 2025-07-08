import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task no.1', description: `Task's name` })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'This is decription',
    description: `Task's decription`,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'PENDING',
    description: `Task's status, is optional`,
  })
  @IsOptional()
  @IsString()
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
