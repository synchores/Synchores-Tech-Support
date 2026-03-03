import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateOrderDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  status: string;
}
