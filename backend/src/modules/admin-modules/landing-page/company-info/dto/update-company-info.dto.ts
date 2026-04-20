import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutEyebrow?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutHeading?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutParagraph2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutImage1?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutImage2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutImage1Alt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare aboutImage2Alt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare missionLabel?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare missionStatement?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare valuesLabel?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare valuesStatement?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare commitmentEyebrow?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare commitmentHeading?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare commitmentStatement?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare footerBrandText?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare companyLogo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare companyLogoAlt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare contactEyebrow?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare contactHeading?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare contactIntroText?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare contactBgImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare contactBgImageAlt?: string;
}
