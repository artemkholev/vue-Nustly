import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IAuthResponse } from './common/interfaces';
import { TokensService } from 'src/tokens/tokens.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async login(userDto: CreateUserDto) {
    //: Promise<IAuthResponse>
    // const user = await this.validateUser(userDto);
    // return this.generateToken(user);
    return userDto;
  }

  async registration(userDto: CreateUserDto): Promise<IAuthResponse> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new BadRequestException('Пользователь с таким email существует');
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const tokens = await this.tokensService.generateTokens({ ...user });
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    // context.res.cookie('refreshToken', tokens.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   samiSite: 'strict',
    // });

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
