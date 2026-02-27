import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsTbl } from './entity/tickets.tbl';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create.ticket';

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(TicketsTbl) private readonly ticketsRepo: Repository<TicketsTbl>){}

    async createTicket(createTicket: CreateTicketDto){
        const newTicket = this.ticketsRepo.create(createTicket);
        return await this.ticketsRepo.save(newTicket);
    }
}
