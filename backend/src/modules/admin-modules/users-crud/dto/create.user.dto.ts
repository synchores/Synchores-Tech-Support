import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {

    @Field()
    @IsNotEmpty()
    @IsString()
    declare firstName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare middleName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare lastName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare emailAddress: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare companyName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare address: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    declare password: string;
}