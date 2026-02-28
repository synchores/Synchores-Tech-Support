import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersTbl } from 'src/modules/general/auth/entity/users.tbl';
import { UsersCrudService } from './users-crud.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Resolver()
export class UsersCrudResolver {
    constructor(private readonly usersCrudService: UsersCrudService){}

    @Query(() => [UsersTbl], { name: 'getAllUsers' })
    async getAllUsers(){
        return await this.usersCrudService.allUsers();
    }

    @Mutation(() => UsersTbl, { name: 'createUser' })
    async createUser(@Args('input') input: CreateUserDto){
        return await this.usersCrudService.createUser(input);
    }

    @Mutation(() => UsersTbl, { name: 'updateUser' })
    async updateUser(@Args('input') input: UpdateUserDto){
        return await this.usersCrudService.updateUser(input);
         
    }

    @Mutation(() => UsersTbl, { name: 'deleteUser' })
    async deleteUser(@Args('userId') userId: number){
        return await this.usersCrudService.deleteUser(userId);
    }
}
