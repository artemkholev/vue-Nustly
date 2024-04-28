import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  HasOne,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Categories } from '../categories/categories.model';
import { BucketItem } from '../bucket/models/bucketItem.model';
import { OrderDetails } from '../orders/models/orderDetails.model';
import { FavoritesItem } from '../favorites/models/favoritesItem.model';

interface ProductsCreationAttrs {
  title: string;
  description: string;
  manufacturer: string;
  price: number;
  photo: string;
}

@Table({ tableName: 'products' })
export class Products extends Model<Products, ProductsCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @ApiProperty({ example: 'Хлеб', description: 'Наименование продукта' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Вкусный свежий хлеб',
    description: 'Описание товара',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'Сосновское',
    description: 'Производитель товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  manufacturer: string;

  @ApiProperty({
    example: '120',
    description: 'Цена товара',
  })
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 'ссылка на фото',
    description: 'Фото товара',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  photo: string;

  @ApiProperty({
    example: 'sdfg8dsfg8dfsfg8fdsg8',
    description: 'id модели',
  })
  @Column({
    type: DataType.STRING,
  })
  id_model: string;

  @ApiProperty({
    example: 'sdfg8dsfg8dfsfg8fdsg8',
    description: 'id поставщик',
  })
  @Column({
    type: DataType.STRING,
  })
  id_provider: string;

  //connection
  @HasMany(() => BucketItem, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  bucketItems: BucketItem[];

  @HasMany(() => FavoritesItem, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  favritesItems: FavoritesItem[];

  @HasOne(() => OrderDetails)
  orders: OrderDetails;

  @ForeignKey(() => Categories)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id_categories: string;
  @BelongsTo(() => Categories)
  categories: Categories;
}
