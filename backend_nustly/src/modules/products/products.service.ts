import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { ProductDto } from './dto/product.dto';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-products.dto';
import { Bucket } from '../bucket/models/bucket.model';
import { BucketItem } from '../bucket/models/bucketItem.model';
import { FavoritesItem } from '../favorites/models/favoritesItem.model';
import { Categories } from '../categories/categories.model';
import { Favorites } from '../favorites/models/favorites.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsRepository: typeof Products,
    @InjectModel(Bucket) private bucketRepository: typeof Bucket,
    @InjectModel(Categories) private categoriesRepository: typeof Categories,
    @InjectModel(Favorites) private favoritesRepository: typeof Favorites,
  ) {}

  async getProducts(
    userId: string,
    categoryId: string,
    response: Response,
    page: number,
    limit: number,
  ) {
    let productsWithElemOptions = null;
    try {
      const products = await this.productsRepository.findAll({
        where: { id_categories: categoryId },
        attributes: { exclude: ['categories'] },
        limit: limit,
        offset: limit * (page - 1),
      });

      if (userId) {
        const bucketItems = await this.bucketRepository
          .findOne({
            where: {
              user_id: userId,
            },
            include: { model: BucketItem },
          })
          .then((data) => data?.dataValues.bucket_item);
        const favoritesItems = await this.favoritesRepository
          .findOne({
            where: {
              user_id: userId,
            },
            include: { model: FavoritesItem },
          })
          .then((data) => data?.dataValues.favorites_item);

        productsWithElemOptions = products.map((product) => {
          const elemBucket = bucketItems?.find(
            (item) => item.products_id === product.dataValues.id,
          );
          const elemFavorites = favoritesItems?.find(
            (item) => item.products_id === product.dataValues.id,
          );
          return Object.assign(product.dataValues, {
            isProductInBucket: elemBucket ? true : false,
            isProductInFavorites: elemFavorites ? true : false,
          });
        });
      }

      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });

      response.set('Access-Control-Expose-Headers', 'X-Total-Count');
      response.set('X-Total-Count', products.length.toString());
      const sendProducts = {
        category: category,
        products: productsWithElemOptions ? productsWithElemOptions : products,
      };
      response.send(sendProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(userId: string, productId: string): Promise<ProductDto> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: productId },
        include: { all: true },
      });
      if (userId) {
        const bucketItems = await this.bucketRepository
          .findOne({
            where: {
              user_id: userId,
            },
            include: { model: BucketItem },
          })
          .then((data) => data?.dataValues.bucket_item);
        if (bucketItems !== undefined) {
          const elemBucket = bucketItems.find(
            (item) => item.products_id === product.dataValues.id,
          );

          return Object.assign(product.dataValues, {
            isProductInBucket: elemBucket ? true : false,
          });
        } else {
          return product;
        }
      }
    } catch (error) {
      console.log(error);
    }
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

  async deleteProduct() {}
}
