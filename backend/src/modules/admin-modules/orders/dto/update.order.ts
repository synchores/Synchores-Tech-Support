import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateOrderDto } from './create.order';

@InputType()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Field()
  @IsNumber()
  declare orderId: number;
}