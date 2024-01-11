import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IAuthResponse } from './common/interfaces';
import { TokensService } from 'src/tokens/tokens.service';
import User from '../users/dto/user.dto';
import { Response } from 'express';
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

  async refreshToken(): Promise<IAuthResponse> {
    return null;
  }

  async logout(): Promise<boolean> {
    return true;
  }

  // private async generateToken(user: User) {
  //   const payload = { email: user.email, id: user.id, roles: user.roles };
  //   return {
  //     token: this.jwtService.sign(payload),
  //   };
  // }

  // private async validateUser(userDto: CreateUserDto) {
  //   const user = await this.userService.getUserByEmail(userDto.email);
  //   const passwordEquals = await bcrypt.compare(
  //     userDto.password,
  //     user.password,
  //   );
  //   if (user && passwordEquals) {
  //     return user;
  //   }
  //   throw new UnauthorizedException({
  //     message: 'Некорректный пароль или email',
  //   });
  // }
}
