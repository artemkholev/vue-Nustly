import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Categories } from 'src/modules/categories/categories.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './products.model';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';
import { Bucket } from '../bucket/models/bucket.model';
import { OrderDetails } from '../orders/models/orderDetails.model';
import { Favorites } from '../favorites/models/favorites.model';

@Module({
  providers: [ProductsService, JwtService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([
      Categories,
      User,
      Products,
      Bucket,
      Favorites,
      OrderDetails,
    ]),
  ],
})
export class ProductsModule {}
