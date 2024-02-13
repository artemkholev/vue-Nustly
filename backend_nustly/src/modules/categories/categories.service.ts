import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { Categories } from './categories.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories) private categoriesRepository: typeof Categories,
  ) {}

  async getCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoriesRepository.findAll({
      where: { visibility: true },
      include: { all: true },
    });
    return categories;
  }

  async createCategories(
    categoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<CategoryDto> {
    const pathPhoto = `http://localhost:5000/${file.path}`;
    const newObjectCategory = {
      title: categoryDto.title,
      visibility: categoryDto.visibility,
      photo: pathPhoto,
    };
    const category = await this.categoriesRepository.create(newObjectCategory);
    return category;
  }

  async deleteCategories(idCategory: string) {
    const category = await this.categoriesRepository.destroy({
      where: { id: idCategory },
    });
    if (category) {
      return false;
    }
    return true;
  }
}
