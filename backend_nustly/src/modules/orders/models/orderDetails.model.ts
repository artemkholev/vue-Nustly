import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Order } from './order.model';
import { Products } from 'src/modules/products/products.model';

@Table({ tableName: 'orderDetails' })
export class OrderDetails extends Model<OrderDetails> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  //connection
  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
  })
  id_product: string;
  @BelongsTo(() => Products)
  product: Products;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  id_order: string;
  @BelongsTo(() => Order)
  order: Order;
}
