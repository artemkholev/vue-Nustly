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
import { BucketItem } from './bucketItem.model';

@Table({ tableName: 'bucket' })
export class Bucket extends Model<Bucket> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @HasMany(() => BucketItem)
  bucket_item: BucketItem[];

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  user_id: string;
  @BelongsTo(() => User)
  user: User;
}
