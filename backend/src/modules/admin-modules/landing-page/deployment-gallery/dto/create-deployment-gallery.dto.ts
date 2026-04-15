import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ContentStatus } from '../../common/content-status.enum';

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

  @Field(() => ContentStatus, { nullable: true })
  @IsOptional()
  declare status?: ContentStatus;
}
