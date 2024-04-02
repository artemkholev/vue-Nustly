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
import { User } from '../users/users.model';
import { Products } from '../products/products.model';

@Table({ tableName: 'favorites' })
export class Favorites extends Model<Favorites> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @ApiProperty({
    example: 'sdfg8dsfg8dfsfg8fdsg8',
    description: 'id пользователя',
  })
  @BelongsTo(() => User)
  users: User;
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
  })
  id_users: string;

  @ApiProperty({
    example: 'sdfg8dsfg8dfsfg8fdsg8',
    description: 'id товара',
  })
  @BelongsTo(() => Products)
  products: Products;
  @ForeignKey(() => Products)
  @Column({
    type: DataType.STRING,
  })
  id_products: string;

  @ApiProperty({
    example: 10,
    description: 'количество товара',
  })
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;
}
