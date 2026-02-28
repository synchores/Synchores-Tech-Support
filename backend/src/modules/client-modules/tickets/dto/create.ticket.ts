import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTicketDto {

    @Field()
    @IsNotEmpty()
    @IsInt()
    serviceId: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    priority?: string;

    @Field()
    @IsNotEmpty()
    @IsDateString()
    deadline: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    attachments?: string;
}