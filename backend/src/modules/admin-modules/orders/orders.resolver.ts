import { Int, Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { OrdersTbl } from './entity/orders.tbl';
import { CreateOrderDto } from './dto/create.order';
import { UpdateOrderDto } from './dto/update.order';

@Resolver()
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService){}

    // ADMIN SIDE ORDER FUNCTIONS

    // for admin to view all orders
    @Query(() => [OrdersTbl], { name: 'allOrders' })
    async allOrders(){
        return await this.ordersService.allOrders();
    }

    @Query(() => OrdersTbl, { name: 'orderDetails' })
    async orderDetails(@Args('orderId', { type: () => Int }) orderId: number){
        return await this.ordersService.orderDetails(orderId);
    }

    // CLIENTS SIDE ORDER FUNCTIONS
    // for clients to view their own orders
    @Query(() => [OrdersTbl], { name: 'clientOrders' })
    async clientOrders(@Args('userId', { type: () => Int }) userId: number){
        return await this.ordersService.clientOrders(userId);
    }

    @Mutation(() => OrdersTbl, { name: 'createOrder' })
    async createOrder(@Args('input') createOrderDto: CreateOrderDto){
        return await this.ordersService.createOrder(createOrderDto);
    }

    @Mutation(() => OrdersTbl, { name: 'updateOrder' })
    async updateOrder(@Args('input') updateOrderDto: UpdateOrderDto){
        return await this.ordersService.updateOrder(updateOrderDto);
    }
}
