import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateHeroSectionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  declare headline: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  declare tagline: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare backgroundImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare focusText?: string;
}
