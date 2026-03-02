import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayUnique, IsArray, IsInt, Min } from 'class-validator';

@InputType()
export class SetClientServicesDto {
    @Field(() => Int)
    @IsInt()
    @Min(1)
    userId: number;

    @Field(() => [Int])
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @Min(1, { each: true })
    clientServicesId: number[];
}
