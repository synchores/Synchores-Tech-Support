import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsTbl } from './entity/tickets.tbl';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create.ticket';

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(TicketsTbl) private readonly ticketsRepo: Repository<TicketsTbl>){}

    async readTicketsForUser(userId: number){
        return await this.ticketsRepo.find({ where: { userId } });
    }

    async createTicket(userId: number, createTicket: CreateTicketDto){
        const deadlineDate = new Date(createTicket.deadline);

        if (Number.isNaN(deadlineDate.getTime())) {
            throw new BadRequestException('Invalid deadline date format');
        }

        const selectedDateUtc = new Date(deadlineDate);
        selectedDateUtc.setUTCHours(0, 0, 0, 0);

        const todayUtc = new Date();
        todayUtc.setUTCHours(0, 0, 0, 0);

        if (selectedDateUtc < todayUtc) {
            throw new BadRequestException('Deadline cannot be in the past');
        }

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
