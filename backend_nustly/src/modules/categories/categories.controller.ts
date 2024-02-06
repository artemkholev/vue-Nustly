import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получение категории' })
  @ApiResponse({ status: 200, type: Categories })
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200 })
  @Post()
  createCategories(@Body() categoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategories(categoryDto);
  }
}
