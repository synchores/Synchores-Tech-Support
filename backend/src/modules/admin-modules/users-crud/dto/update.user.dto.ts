import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create.user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber()
    userId: number;
}