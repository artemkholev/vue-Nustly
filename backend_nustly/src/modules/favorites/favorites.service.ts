import { Favorites } from './models/favorites.model';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from '../products/products.model';
import { User } from '../users/users.model';
import { FavoritesItem } from './models/favoritesItem.model';
import { infoProductDto } from './dto/infoProduct.dto';
import { Response } from 'express';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites) private favoritesRepository: typeof Favorites,
    @InjectModel(Products) private productRepository: typeof Products,
    @InjectModel(FavoritesItem)
    private favoritesItemRepository: typeof FavoritesItem,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createFavorites(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Пользовтель не найден!');
    }

    const favorites = await this.favoritesRepository.create({
      user_id: user.id,
    });

    if (!favorites) {
      throw new ForbiddenException('Не удалось создать избранное!');
    }
    return favorites;
  }

  async addProductInFavorites(
    userId: string,
    infoProduct: infoProductDto,
  ): Promise<boolean> {
    let favorites = await this.favoritesRepository.findOne({
      where: { user_id: userId },
    });

    if (!favorites) {
      favorites = await this.createFavorites(userId);
    }

    const product = await this.productRepository.findOne({
      where: { id: infoProduct.productId },
    });

    if (!product) {
      throw new NotFoundException('Продукт не найден!');
    }

    const favoritesItem = await this.favoritesItemRepository.findOne({
      where: { products_id: product.id },
    });

    if (favoritesItem) {
      throw new BadRequestException('Товар уже находиться в избранном');
    }

    const addedDetails = await this.favoritesItemRepository.create({
      quantity: infoProduct.quantity,
      products_id: product.id,
      favorites_id: favorites.id,
    });

    if (!addedDetails) {
      throw new ForbiddenException('Не удалось добавить товар в избранное!');
    }

    return true;
  }

  async getFavorites(
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

    const favoritesId = await this.favoritesRepository
      .findOne({
        where: { user_id: userId },
      })
      .then((data) => {
        if (!data?.dataValues.id) {
          response.json({ message: 'Избранное не найдено!' });
        }
        return data?.dataValues.id;
      });

    if (favoritesId) {
      const favoritesItems = await this.favoritesItemRepository.findAll({
        where: { favorites_id: favoritesId },
        limit: limit,
        offset: limit * (page - 1),
        include: { model: Products },
      });

      response.set('Access-Control-Expose-Headers', 'X-Total-Count');
      response.set('X-Total-Count', favoritesItems.length.toString());
      response.send(favoritesItems);
    }
  }

  async removeProductInFavorites(
    userId: string,
    infoProduct: infoProductDto,
  ): Promise<boolean> {
    const favorites_id = await this.favoritesRepository
      .findOne({
        where: { user_id: userId },
      })
      .then((data) => data.dataValues.id);

    const favoritesItem = await this.favoritesItemRepository.findOne({
      where: {
        favorites_id: favorites_id,
        products_id: infoProduct.productId,
      },
    });
    await favoritesItem.destroy();

    const favorites = await this.favoritesRepository.findOne({
      where: { user_id: userId },
      include: { all: true },
    });

    if (!favorites.favorites_item.length) {
      await favorites.destroy();
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
