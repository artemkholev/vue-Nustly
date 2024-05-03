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
import { User } from '../../users/users.model';
import { FavoritesItem } from './favoritesItem.model';

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

  @HasMany(() => FavoritesItem)
  favorites_item: FavoritesItem[];

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  user_id: string;
  @BelongsTo(() => User)
  user: User;
}
