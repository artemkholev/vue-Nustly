import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { randomUUID } from 'crypto';

@Table({ tableName: 'tokens', createdAt: false, updatedAt: false })
export class Tokens extends Model<Tokens> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();
  @ApiProperty({ example: '123', description: 'Токен пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refreshToken: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
