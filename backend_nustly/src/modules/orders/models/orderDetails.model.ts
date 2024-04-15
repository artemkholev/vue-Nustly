import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
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
    type: DataType.NUMBER,
  })
  quantity: number;

  //connection
  @HasMany(() => Products)
  products: Products[];

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  order_id: string;
  @BelongsTo(() => Order)
  order: Order;
}
