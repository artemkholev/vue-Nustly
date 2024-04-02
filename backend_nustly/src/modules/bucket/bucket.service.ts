import { Bucket } from './bucket.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BucketService {
  constructor(@InjectModel(Bucket) private bucketRepository: typeof Bucket) {}
}
