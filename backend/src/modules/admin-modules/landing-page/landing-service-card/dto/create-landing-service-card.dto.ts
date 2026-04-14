import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateLandingServiceCardDto {
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
  declare icon?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  declare order?: number;
}
