import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ContentStatus } from '../../common/content-status.enum';

@InputType()
export class UpdateDeploymentGalleryDto {
  @Field(() => Int)
  @IsNotEmpty()
  declare deploymentId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  declare category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  declare order?: number;

  @Field(() => ContentStatus, { nullable: true })
  @IsOptional()
  declare status?: ContentStatus;
}
