import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

@InputType()
export class SignupDto{

    @Field()
    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;
}