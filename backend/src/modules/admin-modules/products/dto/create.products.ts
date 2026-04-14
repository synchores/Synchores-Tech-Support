import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  declare productName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  declare productDescription: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  declare productPrice: number;
}
