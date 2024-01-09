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
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-role.model';
import { Tokens } from 'src/tokens/tokens.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
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

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => Tokens)
  tokens: Tokens[];
}
