import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { ProductDto } from './dto/product.dto';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsRepository: typeof Products,
  ) {}

  async getProducts(
    categoryId: string,
    response: Response,
    page: number,
    limit: number,
  ) {
    const products = await this.productsRepository.findAll({
      where: { id_categories: categoryId },
      include: { all: true },
      limit: limit,
      offset: limit * (page - 1),
    });
    response.set('Access-Control-Expose-Headers', 'X-Total-Count');
    response.set('X-Total-Count', products.length.toString());
    response.send(products);
  }

  async createProduct(
    productDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<ProductDto> {
    const pathPhoto = `http://localhost:5000/${file.path}`;
    const newObjectProduct = {
      id_categories: productDto.id_categories,
      title: productDto.title,
      description: productDto.description,
      manufacturer: productDto.manufacturer,
      price: productDto.price,
      photo: pathPhoto,
    };
    const product = await this.productsRepository.create(newObjectProduct);
    return product;
  }
}
