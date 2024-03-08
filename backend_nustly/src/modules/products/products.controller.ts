import {
  Controller,
  Body,
  Query,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
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

@Controller('categories/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200 })
  @Post('/createProduct')
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

  @ApiOperation({ summary: 'Получение продуктов по категории' })
  @ApiResponse({ status: 200, type: Products })
  @Post()
  getProducts(
    @Query('_page') page: number,
    @Query('_limit') limit: number,
    @Body() categoryId: any,
    @Res() response: Response,
  ) {
    this.productsService.getProducts(categoryId.data, response, page, limit);
  }
}
