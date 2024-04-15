import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Products } from '../products/products.model';

@Table({ tableName: 'categories' })
export class Categories extends Model<Categories> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @ApiProperty({ example: 'техника', description: 'Название категории' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'true', description: 'Видимость категории' })
  @Column({
    type: DataType.BOOLEAN,
  })
  visibility: boolean;

  @ApiProperty({
    example: 'ссылка на фото',
    description: 'Фото на котегорию товара',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  photo: string;

  @HasMany(() => Products, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  categoriesProducts: Products[];
}
