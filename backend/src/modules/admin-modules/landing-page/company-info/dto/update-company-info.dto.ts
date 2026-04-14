import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCompanyInfoDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare phoneMain?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare phoneMobile?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutText?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare whatWeDoTitle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare whatWeDoParagraph1?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare whatWeDoParagraph2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare facebookUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare instagramUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare youtubeUrl?: string;
}
