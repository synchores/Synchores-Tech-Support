import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create.services';
import { ServicesTbl } from './entity/service.tbl';
import { UpdateServiceDto } from './dto/update.services';

@Resolver()
export class ServicesResolver {
    constructor(private readonly servicesService: ServicesService){}

    @Query(() => [ServicesTbl], { name: 'getAllServices' })
    async getAllServices(){
        const services = await this.servicesService.readServices();
        return services;
    }

    @Mutation(() => ServicesTbl, { name: 'createService' })
    async createService(@Args('input') input: CreateServiceDto){
        const service = await this.servicesService.createService(input);
        return service;
    }

    @Mutation(() => ServicesTbl, { name: 'updateService' })
    async updateService(@Args('input') input: UpdateServiceDto){
        const service = await this.servicesService.updateService(input);
        return service;
    }

    @Mutation(() => ServicesTbl, { name: 'deleteService' })
    async deleteService(@Args('serviceId') serviceId: number){
        const service = await this.servicesService.deleteService(serviceId);
        return service;
    }

}
