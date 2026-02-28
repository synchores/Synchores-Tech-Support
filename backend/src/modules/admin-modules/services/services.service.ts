import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesTbl } from './entity/service.tbl';
import { Repository } from 'typeorm/repository/Repository.js';
import { CreateServiceDto } from './dto/create.services';
import { UpdateServiceDto } from './dto/update.services';

@Injectable()
export class ServicesService {
    constructor(@InjectRepository(ServicesTbl) private readonly servicesRepo: Repository<ServicesTbl>){}

    async readServices(){
        return await this.servicesRepo.find();
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

}
