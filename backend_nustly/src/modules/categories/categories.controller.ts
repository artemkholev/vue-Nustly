import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получение категории' })
  @ApiResponse({ status: 200, type: Categories })
  @Get()
  getCategories(): Promise<CategoryDto[]> {
    return this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200 })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../../storage',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtention = file.originalname.split[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtention;
          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(.jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  createCategories(
    @Body() categoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.createCategories(categoryDto, file);
  }

  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200 })
  @Post()
  deleteCategories(@Body() idCategory: string): Promise<boolean> {
    return this.categoriesService.deleteCategories(idCategory);
  }
}
