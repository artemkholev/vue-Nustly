import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Products } from '../products/products.model';
import { Order } from './models/order.model';
import { OrderDetails } from './models/orderDetails.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [SequelizeModule.forFeature([Products, User, Order, OrderDetails])],
})
export class OrderModule {}
