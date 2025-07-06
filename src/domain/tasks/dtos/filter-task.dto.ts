import { IsOptional, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterTaskDto {
  @ApiPropertyOptional({ description: 'key search' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Trạng thái' })
  @IsOptional()
  @Type(() => Boolean)
  isCompleted?: boolean;

  @ApiPropertyOptional({ description: 'Số trang' })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Số lượng record cho 1 trang' })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;
}
