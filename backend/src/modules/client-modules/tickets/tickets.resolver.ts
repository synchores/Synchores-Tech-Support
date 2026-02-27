import { Resolver } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { TicketsTbl } from './entity/tickets.tbl';
import { Mutation, Args } from '@nestjs/graphql';
import { CreateTicketDto } from './dto/create.ticket';

@Resolver()
export class TicketsResolver {
    constructor(private readonly ticketsService: TicketsService){}

    @Mutation(() => TicketsTbl)
    async createTicket(@Args('input') input: CreateTicketDto){
        const ticket = await this.ticketsService.createTicket(input);
        return ticket;
    }
}
