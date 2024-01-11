import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
// import { Context } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(userDto, response);
  }

  @Post('/registration')
  registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.registration(userDto, response);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('/refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
