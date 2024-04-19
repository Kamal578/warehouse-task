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

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    createProductDto: CreateProductDto,
  ) {
    this.logger.log('Creating a new product');
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    this.logger.log('Fetching all products');
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    this.logger.log(`Fetching product with ID: ${id}`);
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      this.logger.log(`Updating product with ID: ${id}`);
      const updatedProduct = await this.productsService.update(
        +id,
        updateProductDto,
      );
      return updatedProduct;
    } catch (error) {
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
  remove(@Param('id') id: number) {
    this.logger.log(`Deleting product with ID: ${id}`);
    return this.productsService.remove(+id);
  }
}
