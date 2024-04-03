import { Bucket } from './models/bucket.model';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from '../products/products.model';
import { User } from '../users/users.model';
import { BucketItem } from './models/bucketItem.model';

@Injectable()
export class BucketService {
  constructor(
    @InjectModel(Bucket) private bucketRepository: typeof Bucket,
    @InjectModel(Products) private productRepository: typeof Products,
    @InjectModel(BucketItem) private bucketItemRepository: typeof BucketItem,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createBucket(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Пользовтель не найден!');
    }

    const basket = await this.bucketRepository.create({
      user,
    });

    if (!basket) {
      throw new ForbiddenException('Не удалось создать корзину!');
    }
    return basket;
  }

  async addProductInBasket(infoProduct, userId: string): Promise<boolean> {
    let bucket = await this.bucketRepository.findOne({
      where: { user_id: { id: userId } },
    });

    if (!bucket) {
      bucket = await this.createBucket(userId);
    }

    const product = await this.productRepository.findOne({
      where: { id: infoProduct.productId },
    });

    if (!product) {
      throw new NotFoundException('Продукт не найден!');
    }

    const addedDetails = await this.bucketItemRepository.create({
      quantity: infoProduct.quantity,
      products_id: product.id,
      bucket_id: bucket.id,
    });

    if (!addedDetails) {
      throw new ForbiddenException('Не удалось добавить товар в корзину!');
    }

    return true;
  }

  async getBasket(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Пользовтель не найден!');
    }

    const bucket = await this.bucketRepository.findOne({
      where: { id: user.bucket.id },
      // relations: ['basket_detail', 'basket_detail.product', 'user'],
    });

    console.log(bucket);

    // if (!basket) {
    //   throw new NotFoundException('Корзина не найдена!');
    // }

    // return basket;
    return null;
  }

  // async deleteProductInBasket(id: number): Promise<boolean> {
  //   const product = await this.basketDetailsRepository.delete({ id });

  //   if (product.affected === 0) {
  //     throw new ForbiddenException('Не удалось удалить товар из корзины!');
  //   }

  //   const details = await this.basketDetailsRepository.find({
  //     where: {
  //       basket: {
  //         id,
  //       },
  //     },
  //   });

  //   console.log(details);

  //   if (!details) {
  //     const basket = await this.basketRepository.delete({ id });

  //     if (basket.affected === 0) {
  //       throw new ForbiddenException('Не удалось удалить корзину!');
  //     }
  //   }

  //   return true;
  // }

  //   async deleteBasket(id: number): Promise<boolean> {
  //     await this.basketDetailsRepository.delete({ basket: { id } });

  //     const basket = await this.basketRepository.delete({ id });

  //     if (basket.affected === 0) {
  //       throw new ForbiddenException('Не удалось очистить корзину!');
  //     }

  //     return true;
  //   }
}
