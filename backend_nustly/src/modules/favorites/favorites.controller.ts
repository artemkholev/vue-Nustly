import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id';
import { infoProductDto } from './dto/infoProduct.dto';
import { Response } from 'express';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Получение корзины' })
  @ApiResponse({ status: 200, type: null })
  @Get()
  getBucket(
    @Query('_page') page: number,
    @Query('_limit') limit: number,
    @GetCurrentUserId() userId: string,
    @Res() response: Response,
  ) {
    this.favoritesService.getFavorites(userId, page, limit, response);
  }

  @ApiOperation({ summary: 'Добавление элемента в корзину' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/add')
  addProductInBasket(
    @Body() infoProduct: infoProductDto,
    @GetCurrentUserId() userId: string,
  ): Promise<boolean> {
    return this.favoritesService.addProductInFavorites(userId, infoProduct);
  }

  @ApiOperation({ summary: 'Удаление элемента в корзине' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/remove')
  removeProductInBasket(
    @Body() infoProduct: infoProductDto,
    @GetCurrentUserId() userId: string,
  ): Promise<boolean> {
    return this.favoritesService.removeProductInFavorites(userId, infoProduct);
  }
}
