import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersTbl } from './entity/users.tbl';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsersTbl) private readonly usersRepo: Repository<UsersTbl>,
        private readonly jwtService: JwtService){}

    async validateUser(emailAddress: string, password: string){
        const users = await this.usersRepo.findOne({ where: { emailAddress } });

        if(!users){
            console.log('User not found');
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, users.password);

        if(!isPasswordValid){
            console.log('Invalid password');
            return null;
        }
        return users;
    }

    async login(users: UsersTbl): Promise<{ accessToken: string }> {
        const payload = {
            sub: users.userId,
            userId: users.userId,
            emailAddress: users.emailAddress,
            role: users.role,
        };

        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    // Query for signup 
    // async signUp(body: SignupDto){
    //     const hashedPassword = await bcrypt.hash(body.password, 10);

    //     const newUser = this.usersRepo.create({
    //         ...body,
    //         password: hashedPassword,
    //     });
    //     return await this.usersRepo.save(newUser);
    // }
}
