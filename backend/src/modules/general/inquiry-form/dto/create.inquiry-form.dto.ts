import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateInquiryFormDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  fullName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  contactNumber: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  message: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  serviceType: string;
}
