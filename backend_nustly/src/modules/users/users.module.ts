import { AuthModule } from '../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/modules/roles/roles.model';
import { UserRoles } from 'src/modules/roles/user-role.model';
import { RolesModule } from 'src/modules/roles/roles.module';
import { Tokens } from 'src/modules/tokens/tokens.model';
import { Products } from '../products/products.model';
import { Bucket } from '../bucket/models/bucket.model';
import { Order } from '../orders/models/order.model';
import { OrderModule } from '../orders/order.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Tokens,
      Products,
      Bucket,
      Order,
    ]),
    RolesModule,
    OrderModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
