import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorites } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites) private bucketRepository: typeof Favorites,
  ) {}
}
