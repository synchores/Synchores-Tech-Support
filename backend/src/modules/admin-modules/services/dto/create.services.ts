import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateServiceDto {

    @Field()
    @IsNotEmpty()
    @IsString()
    declare serviceName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare category: string;

    @Field()
    @IsNotEmpty()
    @IsOptional()
    image?: string;
}