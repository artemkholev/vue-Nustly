import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IAuthResponse } from './common/interfaces';
import { TokensService } from 'src/tokens/tokens.service';
import User from '../users/dto/user.dto';
import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async login(
    userDto: CreateUserDto,
    response: Response,
  ): Promise<IAuthResponse> {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new BadRequestException('Пользователь с таким email не найден');
    }

    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!isPasswordEquals) {
      throw new BadRequestException('Некорректный пароль');
    }

    const userObject = new User(user);
    const tokens = await this.tokensService.generateTokens({ ...userObject });
    await this.tokensService.saveToken(userObject.id, tokens.refreshToken);

    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // samiSite: 'strict',
    });

    return { accessToken: tokens.accessToken };
  }

  async registration(
    userDto: CreateUserDto,
    response: Response,
  ): Promise<IAuthResponse> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new BadRequestException('Пользователь с таким email существует');
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const userObject = new User(user);
    const tokens = await this.tokensService.generateTokens({ ...userObject });
    await this.tokensService.saveToken(userObject.id, tokens.refreshToken);

    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // samiSite: 'strict',
    });

    return { accessToken: tokens.accessToken };
  }

  async refreshToken(
    response: Response,
    request: Request,
  ): Promise<IAuthResponse> {
    const refreshToken = request.headers.cookie
      .split(';')
      .find((el: string) => el.includes('refreshToken='))
      ?.split(';')
      .find((el: string) => el.includes('refreshToken='))
      ?.split('=')
      .at(-1);

    if (!refreshToken) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    const userIsValid =
      await this.tokensService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokensService.findToken(refreshToken);

    if (!userIsValid || !tokenFromDb) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const userObject = new User(tokenFromDb);

    const tokens = await this.tokensService.generateTokens({ ...userObject });
    await this.tokensService.saveToken(userObject.id, tokens.refreshToken);

    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { accessToken: tokens.accessToken };
  }

  async logoutUser(id: number, response: Response): Promise<boolean> {
    try {
      await this.tokensService.removeToken(id, response);
      return true;
    } catch {
      throw new Error('Не удалось выйти из аккаунта');
    }
  }
}
