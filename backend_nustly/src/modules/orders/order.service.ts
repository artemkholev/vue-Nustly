import { OrderDetails } from './models/orderDetails.model';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { OrderDto } from './dto/order.dto';
import { User } from '../users/users.model';
import { Products } from '../products/products.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Products) private productsRepository: typeof Products,
    @InjectModel(OrderDetails)
    private orderDetailsRepository: typeof OrderDetails,
  ) {}

  async createOrder(orderInput: any, userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Пользовтель не найден!');
    }

    const order = await this.orderRepository.create({
      order_date: orderInput.order_date,
      ready_pay: orderInput.ready_pay,
      payment_status: orderInput.payment_status,
      day_payment: orderInput.day_payment,
      phone: orderInput.phone,
      address: orderInput.address,
      city: orderInput.city,
      region: orderInput.region,
      index: orderInput.index,
      name: orderInput.name,
      id_user: userId,
    });

    if (!order) {
      throw new ForbiddenException('Не удалось создать заказ!');
    }

    for (const el of orderInput.orderDetails) {
      const product = await this.productsRepository.findOne({
        where: { id: el.id },
      });

      if (!product) {
        throw new NotFoundException('Продукт не найден!');
      }

      const addedDetails = await this.orderDetailsRepository.create({
        quantity: 1,
        id_product: el.id,
        id_order: order.id,
      });

      if (!addedDetails) {
        throw new ForbiddenException('Не удалось добавить товар в заказ!');
      }
    }

    return true;
  }

  async getAllOrders(userId: string, userRole: string): Promise<OrderDto[]> {
    let orders = null;

    if (userRole === 'ADMIN') {
      orders = await this.orderRepository.findAll({
        include: { all: true },
      });
    } else {
      orders = await this.orderRepository.findAll({
        where: { id_user: userId },
        include: { all: true },
      });
    }

    if (orders.length === 0) {
      throw new NotFoundException('Заказы не найдены!');
    }

    return orders;
  }

  // async getUserOrders(id: number): Promise<OrderEntity[]> {
  //   const order = await this.orderRepository.find({
  //     where: { user: { id } },
  //     relations: ['order_detail', 'order_detail.product', 'user'],
  //     order: { id: 'ASC' },
  //   });

  //   if (!order) {
  //     throw new NotFoundException('Заказы не найдены!');
  //   }

  //   return order;
  // }

  // async getOrder(id: number): Promise<OrderEntity> {
  //   const order = await this.orderRepository.findOne({
  //     where: { id },
  //     relations: ['order_detail', 'order_detail.product', 'user'],
  //   });

  //   if (!order) {
  //     throw new NotFoundException('Заказ не найден!');
  //   }

  //   return order;
  // }

  // async deleteOrder(id: number): Promise<boolean> {
  //   const order = await this.orderRepository.delete({ id });

  //   if (order.affected === 0) {
  //     throw new ForbiddenException('Не удалось удалить заказ!');
  //   }

  //   return true;
  // }

  // async changeStatusOrder(changeStatus: ChangeStatusInput): Promise<boolean> {
  //   const order = await this.orderRepository.findOne({
  //     where: { id: changeStatus.id },
  //   });

  //   if (!order) {
  //     throw new NotFoundException('Не удалось найти заказ!');
  //   }

  //   order.status = changeStatus.status;

  //   const changesOrder = await this.orderRepository.save({
  //     ...order,
  //   });

  //   if (!changesOrder) {
  //     throw new ForbiddenException('Не удалось обновить статус!');
  //   }

  //   return true;
  // }
}
