import { Bucket } from './models/bucket.model';
import { Module } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { BucketController } from './bucket.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Products } from '../products/products.model';
import { BucketItem } from './models/bucketItem.model';

@Module({
  providers: [BucketService],
  controllers: [BucketController],
  imports: [SequelizeModule.forFeature([Products, User, Bucket, BucketItem])],
})
export class BucketModule {}
