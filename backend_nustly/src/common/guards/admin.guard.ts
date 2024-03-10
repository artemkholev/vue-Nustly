import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizationHeader = context.switchToHttp().getRequest()
      .headers.authorization;

    const accessToken = authorizationHeader.split(' ')[1];
    if (accessToken == null) {
      throw new ForbiddenException(
        'Пользователь не имеет прав администратора!',
      );
    }
    const userData: any = await this.jwtService.decode(accessToken);
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
      include: 'roles',
    });
    const role = user.roles[0].dataValues.value;

    if (role === 'ADMIN') return true;
    throw new ForbiddenException('Пользователь не имеет прав администратора!');
  }
}
