import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesTbl } from './entity/service.tbl';
import { Repository } from 'typeorm/repository/Repository.js';
import { CreateServiceDto } from './dto/create.services';
import { UpdateServiceDto } from './dto/update.services';
import { UsersTbl } from '../../general/auth/entity/users.tbl';
import { In } from 'typeorm';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(ServicesTbl) private readonly servicesRepo: Repository<ServicesTbl>,
        @InjectRepository(UsersTbl) private readonly usersRepo: Repository<UsersTbl>,
    ){}

    async readServices(){
        return await this.servicesRepo.find();
    }

    async readServicesForClient(userId: number){
        const user = await this.usersRepo.findOne({ where: { userId } });

        if(!user){
            return [];
        }

        const serviceIds = user.clientServicesId ?? [];

        if(serviceIds.length === 0){
            return [];
        }

        return await this.servicesRepo.find({
            where: { serviceId: In(serviceIds) },
        });
    }

    async createService(createServiceDto: CreateServiceDto){
        const newService = this.servicesRepo.create(createServiceDto);

        if(!newService){
            throw new NotFoundException('Failed to create service');
        }

        return await this.servicesRepo.save(newService);
    }

    async updateService(updateServiceDto: UpdateServiceDto){
        const service = await this.servicesRepo.findOne({ where: { serviceId: updateServiceDto.serviceId } });

        if(!service){
            throw new NotFoundException(`Service with ID ${updateServiceDto.serviceId} not found`);
        }

        const updatedService = Object.assign(service, updateServiceDto);
        return await this.servicesRepo.save(updatedService);
    }

    async deleteService(serviceId: number){
        const deleteService = await this.servicesRepo.findOne({ where: { serviceId } });

        if(!deleteService){
            throw new NotFoundException(`Service with ID ${serviceId} not found`);
        }

        return await this.servicesRepo.remove(deleteService);
    }

    async setClientServices(userId: number, clientServicesId: number[]){
        const user = await this.usersRepo.findOne({ where: { userId } });

        if(!user){
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const uniqueServiceIds = [...new Set(clientServicesId)];

        if(uniqueServiceIds.length === 0){
            user.clientServicesId = [];
            await this.usersRepo.save(user);
            return [];
        }

        const services = await this.servicesRepo.find({
            where: { serviceId: In(uniqueServiceIds) },
        });

        if(services.length !== uniqueServiceIds.length){
            throw new NotFoundException('One or more service IDs were not found');
        }

        user.clientServicesId = uniqueServiceIds;
        await this.usersRepo.save(user);
        return services;
    }

}
