import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateServiceDto {

    @Field()
    @IsNotEmpty()
    @IsString()
    serviceName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    category: string;

    @Field()
    @IsNotEmpty()
    @IsOptional()
    image?: string;
}