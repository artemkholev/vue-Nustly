import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { User } from 'src/modules/users/users.model';
import { OrderDetails } from './orderDetails.model';

@Table({ tableName: 'order' })
export class Order extends Model<Order> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @Column({
    type: DataType.DATE,
  })
  order_date: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  ready_pay: boolean;

  @Column({
    type: DataType.STRING,
  })
  payment_status: string;

  @Column({
    type: DataType.DATE,
  })
  day_payment: Date;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  city: string;

  @Column({
    type: DataType.STRING,
  })
  region: string;

  @Column({
    type: DataType.STRING,
  })
  index: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  //connection
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  user_id: string;
  @BelongsTo(() => User)
  user: User;

  @HasOne(() => OrderDetails)
  order_details: OrderDetails;
}
