import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OrderStatus } from '../entity/order-status.enum';

@InputType()
export class CreateOrderDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  declare productId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  declare userId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  declare quantity: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  declare unitPrice: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  declare totalPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
