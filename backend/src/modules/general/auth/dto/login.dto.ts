import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

@InputType()
export class LoginDto{

    @Field()
    @IsNotEmpty()
    @IsString()
    declare emailAddress: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    declare password: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    role?: string;
}