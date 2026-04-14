import { Mutation, Query, Resolver, Args, ResolveField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsersTbl } from '../../general/auth/entity/users.tbl';
import { UsersCrudService } from './users-crud.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Resolver(() => UsersTbl)
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
    async deleteUser(@Args('userId', { type: () => Int }) userId: number){
        return await this.usersCrudService.deleteUser(userId);
    }

    // client side
    @Query(() => UsersTbl, { name: 'readProfile' })
    async readProfile(@Args('userId', { type: () => Int }) userId: number){
        return await this.usersCrudService.readProfile(userId);
    }
    @ResolveField(() => String, { name: 'fullName' })
    async fullName(parent: UsersTbl): Promise<string> {
         return `${parent.firstName} ${parent.middleName} ${parent.lastName}`;
    }
}
