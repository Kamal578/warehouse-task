import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { LoggerService } from 'src/logger/logger.service';
import { Counter } from 'prom-client';

@Controller('products')
export class ProductsController {
  private internalServerErrorCount: Counter<string>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly logger: LoggerService,
  ) {
    this.internalServerErrorCount = new Counter({
      name: 'product_internal_server_error_count',
      help: 'number of internal server errors',
      labelNames: ['method', 'endpoint'],
    });
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createProductDto: CreateProductDto,
  ) {
    try {
      this.logger.log('Creating a new product');
      return await this.productsService.create(createProductDto);
    } catch (error) {
      this.internalServerErrorCount.inc({
        method: 'POST',
        endpoint: 'products',
      });
      this.logger.error(
        `Failed to create a new product: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(`Failed to create a new product`);
    }
  }

  @Get()
  async findAll() {
    try {
      this.logger.log('Fetching all products');
      return await this.productsService.findAll();
    } catch (error) {
      this.internalServerErrorCount.inc({
        method: 'GET',
        endpoint: 'products',
      });
      this.logger.error(
        `Failed to fetch all products: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(`Failed to fetch all products`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      this.logger.log(`Fetching product with ID: ${id}`);
      return await this.productsService.findOne(+id);
    } catch (error) {
      this.internalServerErrorCount.inc({
        method: 'GET',
        endpoint: 'products/:id',
      });
      this.logger.error(
        `Failed to fetch product with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch product with ID ${id}`,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      this.logger.log(`Updating product with ID: ${id}`);
      return await this.productsService.update(+id, updateProductDto);
    } catch (error) {
      this.internalServerErrorCount.inc({
        method: 'PUT',
        endpoint: 'products/:id',
      });
      this.logger.error(
        `Failed to update product with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to update product with ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      this.logger.log(`Deleting product with ID: ${id}`);
      return await this.productsService.remove(+id);
    } catch (error) {
      this.internalServerErrorCount.inc({
        method: 'DELETE',
        endpoint: 'products/:id',
      });
      this.logger.error(
        `Failed to delete product with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to delete product with ID ${id}`,
      );
    }
  }
}
