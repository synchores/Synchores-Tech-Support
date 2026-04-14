import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTicketDto {

    @Field()
    @IsNotEmpty()
    @IsInt()
    declare serviceId: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare description: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    priority?: string;

    @Field()
    @IsNotEmpty()
    @IsDateString()
    declare deadline: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    attachments?: string;
}