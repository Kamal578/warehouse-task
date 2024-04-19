import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepositoryMock: Record<string, jest.Mock>;

  beforeEach(async () => {
    productRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          quantity: 10,
          price: 100,
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          quantity: 20,
          price: 200,
        },
      ];
      productRepositoryMock.find.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if no products are found', async () => {
      const mockProducts: Product[] = [];
      productRepositoryMock.find.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product with the specified ID', async () => {
      const productId = 1;
      const mockProduct: Product = {
        id: productId,
        name: 'Product 1',
        description: 'Description 1',
        quantity: 10,
        price: 100,
      };
      productRepositoryMock.findOne.mockResolvedValue(mockProduct);

      const result = await service.findOne(productId);

      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException if product with the specified ID is not found', async () => {
      const productId = 23;

      productRepositoryMock.findOne.mockResolvedValue(undefined);

      try {
        await service.findOne(productId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Product #${productId} not found`);
      }
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
      productRepositoryMock.create.mockReturnValue(createdProduct);
      productRepositoryMock.save.mockResolvedValue(createdProduct);

      const result = await service.create(productDto);

      expect(result).toEqual(createdProduct);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const productId = 1;

      // Mock the existing product to be found by findOne
      const existingProduct: Product = {
        id: productId,
        name: 'Existing Product',
        description: 'Existing Description',
        quantity: 10,
        price: 100,
      };
      productRepositoryMock.findOne.mockResolvedValue(existingProduct);

      // Define the updated product DTO
      const productDtoUpdate = {
        name: 'Updated Product',
        description: 'Updated Description',
        quantity: 20,
        price: 200,
      };

      // Define the expected updated product
      const updatedProduct: Product = { id: productId, ...productDtoUpdate };

      // Mock the save method to return the updated product
      productRepositoryMock.save.mockResolvedValue(updatedProduct);

      // Call the update method
      const result = await service.update(productId, productDtoUpdate);

      // Assert that the result matches the expected updated product
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product with the specified ID is not found', async () => {
      const productId = 1;
      const productDto = {
        name: 'Updated Product',
        description: 'Updated Description',
        quantity: 20,
        price: 200,
      };
      productRepositoryMock.findOne.mockResolvedValue(undefined);

      await expect(service.update(productId, productDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing product', async () => {
      const productId = 1;
      const mockProduct: Product = {
        id: productId,
        name: 'Product 1',
        description: 'Description 1',
        quantity: 10,
        price: 100,
      };
      productRepositoryMock.findOne.mockResolvedValue(mockProduct);
      productRepositoryMock.remove.mockResolvedValue(mockProduct);

      const result = await service.remove(productId);

      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException if product with the specified ID is not found', async () => {
      const productId = 1;
      productRepositoryMock.findOne.mockResolvedValue(undefined);

      await expect(service.remove(productId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
