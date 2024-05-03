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
import { Products } from '../../products/products.model';
import { Favorites } from './favorites.model';

@Table({ tableName: 'favorites_item' })
export class FavoritesItem extends Model<FavoritesItem> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @ApiProperty({
    example: 10,
    description: 'количество товара',
  })
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  //connection
  @ForeignKey(() => Products)
  @Column({ type: DataType.UUID })
  products_id: string;
  @BelongsTo(() => Products)
  products: Products;

  @ForeignKey(() => Favorites)
  @Column({ type: DataType.UUID })
  favorites_id: string;
  @BelongsTo(() => Favorites)
  favorites: Favorites;
}
