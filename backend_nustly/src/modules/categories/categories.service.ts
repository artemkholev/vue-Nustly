import { Injectable } from '@nestjs/common';
import { Categories } from './categories.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories) private categoriesRepository: typeof Categories,
  ) {}

  async getCategories() {
    const categories = await this.categoriesRepository.findAll({
      where: { visibility: true },
      include: { all: true },
    });
    return categories;
  }

  async createCategories(categoryDto: CreateCategoryDto): Promise<boolean> {
    console.log(categoryDto);
    return true;
  }
}
