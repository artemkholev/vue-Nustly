import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/modules/roles/roles.model';
import { UserRoles } from 'src/modules/roles/user-role.model';
import { Tokens } from 'src/modules/tokens/tokens.model';
import { randomUUID } from 'crypto';
import { Bucket } from '../bucket/bucket.model';
import { Products } from '../products/products.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string = randomUUID();

  @ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адрес' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '123', description: 'Пароль пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  //connection
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Products, () => Bucket)
  products: Products[];

  @HasOne(() => Tokens)
  tokens: Tokens;
}
