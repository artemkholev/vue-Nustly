import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from './categories.model';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CategoriesService, CategoriesController, JwtService],
  controllers: [CategoriesController],
  imports: [SequelizeModule.forFeature([Categories, User])],
})
export class CategoriesModule {}
