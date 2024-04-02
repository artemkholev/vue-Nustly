import { Bucket } from './bucket.model';
import { Module } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { BucketController } from './bucket.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Products } from '../products/products.model';

@Module({
  providers: [BucketService],
  controllers: [BucketController],
  imports: [SequelizeModule.forFeature([Products, User, Bucket])],
})
export class BucketModule {}
