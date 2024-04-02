import { Controller } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('categories')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
}
