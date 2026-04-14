import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create.user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Field()
    @IsNumber()
    declare userId: number;
}