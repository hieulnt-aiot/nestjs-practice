import { IsOptional, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterTaskDto {
  @ApiPropertyOptional({ description: 'Key search' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 'PENDING',
    description: `Filter by status ('PENDING' | 'IN_PROGRESS' | 'COMPLETED')`,
  })
  @IsOptional()
  @Type(() => Boolean)
  isCompleted?: boolean;

  @ApiPropertyOptional({ example: '1', description: 'Current page' })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    example: '10',
    description: 'Number of records for one page',
  })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;
}
