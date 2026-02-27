import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersTbl } from 'src/modules/general/auth/entity/users.tbl';
import { UsersCrudService } from './users-crud.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Resolver()
export class UsersCrudResolver {
    constructor(private readonly usersCrudService: UsersCrudService){}

    @Query(() => [UsersTbl])
    async getAllUsers(){
        const users = await this.usersCrudService.allUsers();
        return users;
    }

    @Mutation(() => UsersTbl)
    async createUser(@Args('input') input: CreateUserDto){
        const user = await this.usersCrudService.createUser(input);
        return user;
    }

    @Mutation(() => UsersTbl)
    async updateUser(@Args('input') input: UpdateUserDto){
        const user = await this.usersCrudService.updateUser(input);
        return user;
    }

    @Mutation(() => UsersTbl)
    async deleteUser(@Args('userId') userId: number){
        const user = await this.usersCrudService.deleteUser(userId);
        return user;
    }
}
