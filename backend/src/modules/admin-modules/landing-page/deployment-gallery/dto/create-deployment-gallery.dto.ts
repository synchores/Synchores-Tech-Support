import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateDeploymentGalleryDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  declare title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  declare description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  declare image: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  declare category: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  declare order?: number;
}
