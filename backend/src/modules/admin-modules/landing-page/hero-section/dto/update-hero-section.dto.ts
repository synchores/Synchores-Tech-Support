import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateHeroSectionDto {
  @Field(() => Int)
  @IsNotEmpty()
  declare heroId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare headline?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare tagline?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare backgroundImage?: string;
}
