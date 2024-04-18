import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity'; // Import Product entity
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // Import TypeOrmModule with Product entity
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}