import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TicketStatusService } from './ticket-status.service';
import { UpdateTicketStatusDto } from './dto/update.ticket-status';
import { TicketsTbl } from '../../../modules/client-modules/tickets/entity/tickets.tbl';

@Resolver(() => TicketsTbl)
export class TicketStatusResolver {
    constructor(private readonly ticketStatusService: TicketStatusService) {}

    @Query(() => [TicketsTbl], { name: 'getAllTickets' })
    async getAllTickets() {
        return await this.ticketStatusService.allTickets();
    }

    @Mutation(() => TicketsTbl, { name: 'updateTicketStatus' })
    async updateTicketStatus(@Args('input') input: UpdateTicketStatusDto) {
        return await this.ticketStatusService.updateTicketStatus(input);
    }
}
