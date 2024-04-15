import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FilesModule } from './modules/files/files.module';
import { BucketModule } from './modules/bucket/bucket.module';

import { User } from './modules/users/users.model';
import { Role } from './modules/roles/roles.model';
import { UserRoles } from './modules/roles/user-role.model';
import { Tokens } from './modules/tokens/tokens.model';
import { Categories } from './modules/categories/categories.model';
import { Products } from './modules/products/products.model';
import { ProductsModule } from './modules/products/products.module';
import { Bucket } from './modules/bucket/models/bucket.model';
import { BucketItem } from './modules/bucket/models/bucketItem.model';
import { Order } from './modules/orders/models/order.model';
import { OrderDetails } from './modules/orders/models/orderDetails.model';
import { OrderModule } from './modules/orders/order.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [
        User,
        Role,
        UserRoles,
        Tokens,
        Categories,
        Products,
        Bucket,
        BucketItem,
        Order,
        OrderDetails,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    FilesModule,
    ProductsModule,
    BucketModule,
    OrderModule,
  ],
})
export class AppModule {}
