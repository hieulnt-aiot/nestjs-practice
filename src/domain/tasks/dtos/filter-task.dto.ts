import { IsOptional, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Boolean)
  isCompleted?: boolean;

  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;
}
