import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';
import { CategoryDto, IdCategoryDto } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from 'src/common/utils/file-upload.utils';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { GetCurrentUserRole } from 'src/common/decorators/get-current-user-role';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получение категории' })
  @ApiResponse({ status: 200, type: Categories })
  @Get()
  getCategories(
    @GetCurrentUserRole() userRole: string,
  ): Promise<CategoryDto[]> {
    return this.categoriesService.getCategories(userRole);
  }

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200 })
  @Post()
  @UseGuards(AdminGuard)
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
  @UseGuards(AdminGuard)
  deleteCategories(@Body() category: IdCategoryDto): Promise<boolean> {
    return this.categoriesService.deleteCategories(category.id);
  }

  @ApiOperation({ summary: 'Видимость категории' })
  @ApiResponse({ status: 200 })
  @Post('/visibility')
  visibilityCategory(@Body() category: IdCategoryDto): Promise<boolean> {
    return this.categoriesService.visibilityCategory(category.id);
  }
}
