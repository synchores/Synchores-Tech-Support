import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateInquiryFormDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  declare fullName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  declare email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  declare contactNumber: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  declare message: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  declare serviceType: string;
}
