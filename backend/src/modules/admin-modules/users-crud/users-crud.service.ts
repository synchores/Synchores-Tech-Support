import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersTbl } from 'src/modules/general/auth/entity/users.tbl';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersCrudService {
    constructor(@InjectRepository(UsersTbl) private usersRepository: Repository<UsersTbl>) {}

    async allUsers(){
        return await this.usersRepository.find();
    }

    async createUser(createUserDto: CreateUserDto){
        const newUser = this.usersRepository.create(createUserDto);

        if(!newUser){
            console.log('Failed to create user');
            return null;
        }

        return await this.usersRepository.save(newUser);
    }

    async updateUser(updateUserDto: UpdateUserDto){
        const user = await this.usersRepository.findOne({ where: { userId: updateUserDto.userId } });
        if (!user) {
            console.log('User not found');
            return null;
        }
        this.usersRepository.merge(user, updateUserDto);
        return await this.usersRepository.save(user);
    }

    async deleteUser(userId: number){
        const user = await this.usersRepository.findOne({ where: { userId } });
        if (!user) {
            console.log('User not found');
            return null;
        }
        return await this.usersRepository.remove(user);
    }
}    
