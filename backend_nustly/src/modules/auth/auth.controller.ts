import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
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
  logout(
    @GetCurrentUserId() userId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logoutUser(userId, response);
  }

  @Post('/refresh')
  refreshToken(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return this.authService.refreshToken(response, request);
  }
}
