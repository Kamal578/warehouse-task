import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsNumber, IsString, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional() // Field is optional for update
  @IsString()
  name?: string;

  @IsOptional() // Field is optional for update
  @IsString()
  description?: string;

  @IsOptional() // Field is optional for update
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @IsOptional() // Field is optional for update
  @IsNumber()
  @IsPositive()
  price?: number;
}
