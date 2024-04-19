import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          quantity: 10,
          price: 100,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a product with the specified ID', async () => {
      const productId = 1;
      const result: Product = {
        id: productId,
        name: 'Product 1',
        description: 'Description 1',
        quantity: 10,
        price: 100,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(productId)).toBe(result);
    });

    it('should throw an error if product is not found', async () => {
      const productId = 1;
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Product #${productId} not found`),
        );

      await expect(controller.findOne(productId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productDto = {
        name: 'New Product',
        description: 'Description',
        quantity: 10,
        price: 100,
      };
      const createdProduct: Product = { id: 1, ...productDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdProduct);

      expect(await controller.create(productDto)).toBe(createdProduct);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const productId = 1;
      const productDto = {
        name: 'Updated Product',
        description: 'Updated Description',
        quantity: 20,
        price: 200,
      };
      const updatedProduct: Product = { id: productId, ...productDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedProduct);

      expect(await controller.update(productId, productDto)).toBe(
        updatedProduct,
      );
    });

    it('should throw an error if product is not found', async () => {
      const productId = 1;
      const productDto = {
        name: 'Updated Product',
        description: 'Updated Description',
        quantity: 20,
        price: 200,
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException(`Product #${productId} not found`),
        );

      await expect(controller.update(productId, productDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const productId = 1;
      const productToRemove: Product = {
        id: productId,
        name: 'Product 1',
        description: 'Description 1',
        quantity: 10,
        price: 100,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(productToRemove);

      expect(await controller.remove(productId)).toBe(productToRemove);
    });

    it('should throw an error if product is not found', async () => {
      const productId = 1;
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException(`Product #${productId} not found`),
        );

      await expect(controller.remove(productId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
