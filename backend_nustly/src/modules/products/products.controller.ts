import {
  Controller,
  Body,
  Query,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Products } from './products.model';
import { ProductDto } from './dto/product.dto';
import { Response } from 'express';
import { AdminGuard } from 'src/common/guards/admin.guard';
import {
  editFileName,
  imageFileFilter,
} from 'src/common/utils/file-upload.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('categories')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 201 })
  @Post('/products/createProduct')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './dist/files/products',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() productDto: any,
  ): Promise<ProductDto> {
    return this.productsService.createProduct(
      JSON.parse(productDto.data),
      file,
    );
  }

  @ApiOperation({ summary: 'Получение товаров по категории' })
  @ApiResponse({ status: 200, type: Products })
  @Get('/products/:categoryId')
  getProducts(
    @Query('_page') page: number,
    @Query('_limit') limit: number,
    @Param('categoryId') categoryId: string,
    @Res() response: Response,
  ) {
    this.productsService.getProducts(categoryId, response, page, limit);
  }

  @ApiOperation({ summary: 'Получение товара по категории' })
  @ApiResponse({ status: 200, type: Products })
  @Get('/product/:productId')
  getProduct(@Param('productId') productId: string): Promise<ProductDto> {
    return this.productsService.getProduct(productId);
  }
}
