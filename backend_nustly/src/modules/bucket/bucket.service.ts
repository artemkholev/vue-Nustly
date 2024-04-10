import { Bucket } from './models/bucket.model';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from '../products/products.model';
import { User } from '../users/users.model';
import { BucketItem } from './models/bucketItem.model';
import { infoProductDto } from './dto/infoProduct.dto';
import { Response } from 'express';

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
      user_id: user.id,
    });

    if (!basket) {
      throw new ForbiddenException('Не удалось создать корзину!');
    }
    return basket;
  }

  async addProductInBasket(
    userId: string,
    infoProduct: infoProductDto,
  ): Promise<boolean> {
    let bucket = await this.bucketRepository.findOne({
      where: { user_id: userId },
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

    const bucketItem = await this.bucketItemRepository.findOne({
      where: { products_id: product.id },
    });

    if (bucketItem) {
      throw new BadRequestException('Товар уже находиться в кoрзине');
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

  async getBucket(
    userId: string,
    page: number,
    limit: number,
    response: Response,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      response.json({ message: 'Пользовтель не найден!' });
    }

    const bucketId = await this.bucketRepository
      .findOne({
        where: { user_id: userId },
      })
      .then((data) => {
        if (!data?.dataValues.id) {
          response.json({ message: 'Корзина не найдена!' });
        }
        return data?.dataValues.id;
      });

    if (bucketId) {
      const bucketItems = await this.bucketItemRepository.findAll({
        where: { bucket_id: bucketId },
        limit: limit,
        offset: limit * (page - 1),
        include: { model: Products },
      });

      response.set('Access-Control-Expose-Headers', 'X-Total-Count');
      response.set('X-Total-Count', bucketItems.length.toString());
      response.send(bucketItems);
    }
  }

  async removeProductInBasket(
    userId: string,
    infoProduct: infoProductDto,
  ): Promise<boolean> {
    const bucket_id = await this.bucketRepository
      .findOne({
        where: { user_id: userId },
      })
      .then((data) => data.dataValues.id);
    console.log(bucket_id);
    const bucketItem = await this.bucketItemRepository.findOne({
      where: {
        bucket_id: bucket_id,
        products_id: infoProduct.productId,
      },
    });
    await bucketItem.destroy();

    const bucket = await this.bucketRepository.findOne({
      where: { user_id: userId },
    });

    if (bucket.dataValues?.bucket_item == undefined) {
      await bucket.destroy();
    }

    return true;
  }

  //   async deleteBasket(id: number): Promise<boolean> {
  //     await this.basketDetailsRepository.delete({ basket: { id } });

  //     const basket = await this.basketRepository.delete({ id });

  //     if (basket.affected === 0) {
  //       throw new ForbiddenException('Не удалось очистить корзину!');
  //     }

  //     return true;
  //   }
}
