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
import { Bucket } from './bucket.model';

@Table({ tableName: 'bucket_item' })
export class BucketItem extends Model<BucketItem> {
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
  @BelongsTo(() => Products)
  products: Products;
  @ForeignKey(() => Products)
  @Column({ type: DataType.UUID })
  products_id: string;

  @BelongsTo(() => Bucket)
  bucket: Bucket;
  @ForeignKey(() => Bucket)
  @Column({ type: DataType.UUID })
  bucket_id: string;
}
