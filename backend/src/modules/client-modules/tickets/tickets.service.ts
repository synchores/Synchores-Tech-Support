import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsTbl } from './entity/tickets.tbl';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create.ticket';

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(TicketsTbl) private readonly ticketsRepo: Repository<TicketsTbl>){}

    async createTicket(userId: number, createTicket: CreateTicketDto){
        const deadlineDate = new Date(createTicket.deadline);

        const newTicket = this.ticketsRepo.create({
            ...createTicket,
            deadline: deadlineDate,
            userId,
        });

        const savedTicket = await this.ticketsRepo.save(newTicket);

        if (!(savedTicket.deadline instanceof Date)) {
            savedTicket.deadline = new Date(savedTicket.deadline as unknown as string);
        }

        return savedTicket;
    }
}
