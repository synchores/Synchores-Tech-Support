import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersTbl } from './entity/orders.tbl';
import { CreateOrderDto } from './dto/create.order';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update.order';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(OrdersTbl) private readonly ordersRepository: Repository<OrdersTbl>) {}

    // ADMIN SIDE ORDER FUNCTIONS

    // for admin to view all orders
    async allOrders(){
        return await this.ordersRepository.find();
    }

    async orderDetails(orderId: number){
        return await this.ordersRepository.findOne({ where: { orderId } });
    }

    // CLIENTS SIDE ORDER FUNCTIONS
    // for clients to view their own orders
    async clientOrders(userId: number){
        return await this.ordersRepository.find({ where: { userId } });
    }

    async createOrder(createOrderDto: CreateOrderDto){
        const order = this.ordersRepository.create(createOrderDto);
        return await this.ordersRepository.save(order);
    }

    
    async updateOrder(updateOrderDto: UpdateOrderDto){
        const order = await this.ordersRepository.findOne({ where: { orderId: updateOrderDto.orderId } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        const { orderId, ...updates } = updateOrderDto;
        Object.assign(order, updates);
        return await this.ordersRepository.save(order);
    }
}
