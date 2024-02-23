import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Categories } from 'src/modules/categories/categories.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [SequelizeModule.forFeature([Categories])],
  exports: [ProductsService],
})
export class ProductsModule {}
