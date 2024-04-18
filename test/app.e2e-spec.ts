import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
import { ProductsModule } from './../src/products/products.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('/products/:id (GET)', async () => {
    // First, create a new product to retrieve its ID
    const createResponse = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        quantity: 10,
        price: 9.99,
      });
    const productId = createResponse.body.id;

    // Now, retrieve the product by ID
    const response = await request(app.getHttpServer()).get(
      `/products/${productId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Product');
    expect(response.body.description).toBe('Test Description');
    expect(response.body.quantity).toBe(10);
    expect(response.body.price).toBe(9.99);
  });

  it('/products (POST)', async () => {
    const productData = {
      name: 'New Product',
      description: 'New Description',
      quantity: 5,
      price: 19.99,
    };
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(productData);
  });

  it('/products/:id (PUT)', async () => {
    // First, create a new product to update it later
    const createResponse = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        quantity: 10,
        price: 9.99,
      });
    const productId = createResponse.body.id;

    // Update the product
    const updatedData = {
      name: 'Updated Product',
      description: 'Updated Description',
      quantity: 15,
      price: 29.99,
    };
    const updateResponse = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .send(updatedData);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toMatchObject(updatedData);
  });

  it('/products/:id (DELETE)', async () => {
    // First, create a new product to delete it later
    const createResponse = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        quantity: 10,
        price: 9.99,
      });
    const productId = createResponse.body.id;

    // Delete the product
    const deleteResponse = await request(app.getHttpServer()).delete(
      `/products/${productId}`,
    );
    expect(deleteResponse.status).toBe(200);
  });
});
