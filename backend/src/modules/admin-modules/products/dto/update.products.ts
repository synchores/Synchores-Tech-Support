import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateProductDto } from './create.products';

@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Field()
  @IsNumber()
  productId: number;
}
