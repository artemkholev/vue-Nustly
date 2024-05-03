import { Favorites } from './models/favorites.model';
import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Products } from '../products/products.model';
import { FavoritesItem } from './models/favoritesItem.model';
import { Bucket } from '../bucket/models/bucket.model';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    SequelizeModule.forFeature([
      Products,
      User,
      Favorites,
      FavoritesItem,
      Bucket,
    ]),
  ],
})
export class FavoritesModule {}
