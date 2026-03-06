import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {

    @Field()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    middleName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    address: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;
}