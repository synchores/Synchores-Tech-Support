import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create.services';
import { ServicesTbl } from './entity/service.tbl';
import { UpdateServiceDto } from './dto/update.services';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { SetClientServicesDto } from './dto/set.client-services';

@Resolver()
export class ServicesResolver {
    constructor(
        private readonly servicesService: ServicesService,
        private readonly jwtService: JwtService,
    ){}

    @Query(() => [ServicesTbl], { name: 'getAllServices' })
    async getAllServices(){
        const services = await this.servicesService.readServices();
        return services;
    }

    @Query(() => [ServicesTbl], { name: 'getMyServices' })
    async getMyServices(@Context() context: any){
        const authHeader = context?.req?.headers?.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedException('Missing or invalid authorization token');
        }

        const token = authHeader.replace('Bearer ', '');
        const payload = this.jwtService.verify<{ userId?: number; sub?: number }>(token, {
            secret: process.env.JWT_SECRET,
        });

        const userId = payload.userId ?? payload.sub;

        if(!userId){
            throw new UnauthorizedException('Invalid token payload');
        }

        return await this.servicesService.readServicesForClient(userId);
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

    @Mutation(() => [ServicesTbl], { name: 'setClientServices' })
    async setClientServices(@Args('input') input: SetClientServicesDto){
        return await this.servicesService.setClientServices(input.userId, input.clientServicesId);
    }

}
