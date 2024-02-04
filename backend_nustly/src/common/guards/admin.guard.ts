import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const authorizationHeader = ctx.switchToHttp().getRequest()
      .headers.authorization;
    const accessToken = authorizationHeader.split(' ')[1];
    const userData: any = await this.jwtService.decode(accessToken);

    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    const role = user.roles;

    console.log(role);

    if (role) return true;

    throw new ForbiddenException('Пользователь не имеет прав администратора!');
  }
}
