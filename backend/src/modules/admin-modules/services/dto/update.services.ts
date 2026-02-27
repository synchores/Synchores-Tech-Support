import { InputType, PartialType } from '@nestjs/graphql';
import { CreateServiceDto } from './create.services';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateServiceDto extends PartialType(CreateServiceDto) {

    @IsNumber()
    serviceId: number;
}