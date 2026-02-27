import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTicketDto {

    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    priority?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    deadline: Date;

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    attachments?: string;
}