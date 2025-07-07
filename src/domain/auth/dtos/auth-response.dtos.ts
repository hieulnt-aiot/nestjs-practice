import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @ApiProperty({ example: '9e474eba-9be4-4ff4-ab93-cdeb4923cdc4' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @Expose()
  fullName: string;
}
