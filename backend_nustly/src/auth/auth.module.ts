import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Tokens } from 'src/tokens/tokens.model';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({}),
    SequelizeModule.forFeature([User, Tokens]),
  ],
  providers: [AuthService, TokensService, JwtService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
