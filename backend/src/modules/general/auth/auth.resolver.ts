import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './responses/login.response';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

    @Mutation(() => LoginResponse)
    async login(@Args('emailAddress') emailAddress: string,
                @Args('password') password: string){
        const users = await this.authService.validateUser(emailAddress, password);

        if(!users){
            console.log('Invalid credentials');
            return null;
        }

        const token = this.authService.login(users);
        return token;
    }

    // Query for signup 
    // @Mutation(() => UsersTbl)
    // async register(@Args('input') input: LoginDto){
    //     const user = await this.authService.signUp(input);
    //     return user;
    // }
}