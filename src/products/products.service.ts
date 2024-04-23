import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class ProductsService {
  // Define Prometheus metrics

  private requestDuration: Histogram<string>;
  private requestCount: Counter<string>;
  private errorCount: Counter<string>;
  private dbQueryCount: Counter<string>;

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {
    // Initialize custom metrics
    this.requestDuration = new Histogram({
      name: 'product_request_duration_seconds',
      help: 'duration of product request in seconds',
      labelNames: ['method', 'endpoint'],
      buckets: [0.0001, 0.001, 0.01, 0.1, 0.5, 1, 1.5, 2, 3, 5],
    });
    this.requestCount = new Counter({
      name: 'product_request_count',
      help: 'number of product requests',
      labelNames: ['method', 'endpoint'],
    });
    this.errorCount = new Counter({
      name: 'product_error_count',
      help: 'number of product errors',
      labelNames: ['method', 'endpoint'],
    });
    this.dbQueryCount = new Counter({
      name: 'product_db_query_count',
      help: 'number of product database queries',
      labelNames: ['method', 'endpoint'],
    });
  }

  create(createProductDto: CreateProductDto) {
    const endTimer = this.requestDuration.startTimer();

    // Increment request count
    this.requestCount.inc({
      method: 'POST',
      endpoint: 'products',
    });

    // DB operation
    const product = this.productsRepository.create(createProductDto);
    const savedProduct = this.productsRepository.save(product);

    // Increment DB query count

    this.dbQueryCount.inc({
      method: 'POST',
      endpoint: 'products',
    });

    endTimer();

    return savedProduct;
  }

  findAll() {
    const endTimer = this.requestDuration.startTimer();
    this.requestCount.inc({
      method: 'GET',
      endpoint: 'products',
    });
    const products = this.productsRepository.find();
    this.dbQueryCount.inc({
      method: 'GET',
      endpoint: 'products',
    });
    endTimer();
    return products;
  }

  findOne(id: number) {
    const endTimer = this.requestDuration.startTimer();
    this.requestCount.inc({
      method: 'GET',
      endpoint: 'products/:id',
    });

    const product = this.productsRepository.findOne({
      where: { id },
    });

    this.dbQueryCount.inc({
      method: 'GET',
      endpoint: 'products/:id',
    });
    endTimer();
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const endTimer = this.requestDuration.startTimer();
    this.requestCount.inc({
      method: 'PUT',
      endpoint: 'products/:id',
    });
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      this.errorCount.inc({
        method: 'PUT',
        endpoint: 'products/:id',
      });
      throw new NotFoundException(`Product #${id} not found`);
    }

    Object.assign(product, updateProductDto);

    const updatedProduct = await this.productsRepository.save(product);

    this.dbQueryCount.inc({
      method: 'PUT',
      endpoint: 'products/:id',
    });
    endTimer();
    return updatedProduct;
  }

  async remove(id: number) {
    const endTimer = this.requestDuration.startTimer();
    this.requestCount.inc({
      method: 'DELETE',
      endpoint: 'products/:id',
    });
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      this.errorCount.inc({
        method: 'DELETE',
        endpoint: 'products/:id',
      });
      throw new NotFoundException(`Product #${id} not found`);
    }

    const deleted = await this.productsRepository.remove(product);
    this.dbQueryCount.inc({
      method: 'DELETE',
      endpoint: 'products/:id',
    });
    endTimer();
    return deleted;
  }
}
