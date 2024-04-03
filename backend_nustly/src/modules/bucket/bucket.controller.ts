import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @ApiOperation({ summary: 'Получение корзины' })
  @ApiResponse({ status: 200, type: null })
  @Get('/:userId')
  getBasket(@Param('userId') userId: string) {
    return this.bucketService.getBasket(userId);
  }

  @ApiOperation({ summary: 'Добавление элемента в корзину' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/:userId')
  addProductInBasket(
    @Body() infoProduct,
    @Param('userId') userId: string,
  ): Promise<boolean> {
    return this.bucketService.addProductInBasket(infoProduct, userId);
  }
}
