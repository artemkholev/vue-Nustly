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
// import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto, DeleteCategoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from 'src/common/utils/file-upload.utils';

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
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './dist/files/categories',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createCategories(
    @UploadedFile() file: Express.Multer.File,
    @Body() categoryDto: any,
  ) {
    return this.categoriesService.createCategories(
      JSON.parse(categoryDto.data),
      file,
    );
  }

  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200 })
  @Post('/delete')
  deleteCategories(@Body() category: DeleteCategoryDto): Promise<boolean> {
    console.log(category.id);
    return this.categoriesService.deleteCategories(category.id);
  }
}
