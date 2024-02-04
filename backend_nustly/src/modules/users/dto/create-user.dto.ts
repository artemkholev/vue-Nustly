import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'Почтовый адрес' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: '123', description: 'Пароль' })
  @IsNotEmpty()
  readonly password: string;
}
