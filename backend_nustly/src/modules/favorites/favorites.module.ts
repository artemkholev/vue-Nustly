import { Favorites } from './favorites.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Products } from '../products/products.model';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [SequelizeModule.forFeature([Products, User, Favorites])],
})
export class FavoritesModule {}
