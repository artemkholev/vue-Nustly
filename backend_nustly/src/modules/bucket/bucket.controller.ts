import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id';
import { infoProductDto } from './dto/infoProduct.dto';

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
  @Post('/add')
  addProductInBasket(
    @Body() infoProduct: infoProductDto,
    @GetCurrentUserId() userId: string,
  ): Promise<boolean> {
    return this.bucketService.addProductInBasket(userId, infoProduct);
  }

  @ApiOperation({ summary: 'Удаление элемента в корзине' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('/remove')
  removeProductInBasket(
    @Body() infoProduct: infoProductDto,
    @GetCurrentUserId() userId: string,
  ): Promise<boolean> {
    return this.bucketService.removeProductInBasket(userId, infoProduct);
  }
}
