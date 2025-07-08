import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'newuser@example.com',
    description: 'New user email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Join Smith' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'Password with minimum 6 characters',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
