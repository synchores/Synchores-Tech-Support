import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

@InputType()
export class LoginDto{

    @Field()
    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    role?: string;
}