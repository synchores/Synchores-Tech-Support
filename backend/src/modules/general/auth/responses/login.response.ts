import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
    @Field()
    declare accessToken: string;
}
