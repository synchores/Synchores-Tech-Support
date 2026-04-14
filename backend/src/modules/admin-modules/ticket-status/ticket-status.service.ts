import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTicketStatusDto } from './dto/update.ticket-status';
import { TicketStatus } from './dto/update.ticket-status';
import { TicketsTbl } from '../../client-modules/tickets/entity/tickets.tbl';
import { Repository } from 'typeorm';

@Injectable()
export class TicketStatusService {
    constructor(@InjectRepository(TicketsTbl) private readonly ticketsRepo: Repository<TicketsTbl>) {}

    private getAllowedNextStatuses(status: TicketStatus): TicketStatus[] {
        if (status === TicketStatus.PENDING) {
            return [TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED];
        }

        if (status === TicketStatus.IN_PROGRESS) {
            return [TicketStatus.ON_HOLD, TicketStatus.COMPLETED, TicketStatus.CANCELLED];
        }

        if (status === TicketStatus.ON_HOLD) {
            return [TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED];
        }

        return [];
    }

    private isValidStatusTransition(currentStatus: TicketStatus, nextStatus: TicketStatus): boolean {
        const allowedNextStatuses = this.getAllowedNextStatuses(currentStatus);
        return allowedNextStatuses.includes(nextStatus);
    }

    async allTickets(){
        return await this.ticketsRepo.find();
    }

    async updateTicketStatus(updateTicketStatusDto: UpdateTicketStatusDto){
        const ticket = await this.ticketsRepo.findOne({
            where: { ticketId: updateTicketStatusDto.ticketId },
        });

        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }

        const currentStatus = ticket.status as TicketStatus;
        const nextStatus = updateTicketStatusDto.status;

        if (currentStatus === nextStatus) {
            return ticket;
        }

        if (!this.isValidStatusTransition(currentStatus, nextStatus)) {
            throw new BadRequestException(
                `Invalid status transition: ${currentStatus} -> ${nextStatus}`,
            );
        }

        ticket.status = nextStatus;

        return await this.ticketsRepo.save(ticket);
    }

    
}
