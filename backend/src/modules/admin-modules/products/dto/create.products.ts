import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  productPrice: number;
}
