import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
  providers: [TokensService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [TokensService],
})
export class TokensModule {}
