import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsTbl } from './entity/tickets.tbl';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create.ticket';

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(TicketsTbl) private readonly ticketsRepo: Repository<TicketsTbl>){}

    private normalizeTitle(title: string) {
        return title.trim().replace(/\s+/g, ' ').toLowerCase();
    }

    async readTicketsForUser(userId: number){
        return await this.ticketsRepo.find({ where: { userId } });
    }

    async createTicket(userId: number, createTicket: CreateTicketDto){
        const trimmedTitle = createTicket.title?.trim();

        if (!trimmedTitle) {
            throw new BadRequestException('Ticket title is required');
        }

        const normalizedIncomingTitle = this.normalizeTitle(trimmedTitle);

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

        const duplicateTicket = await this.ticketsRepo
            .createQueryBuilder('ticket')
            .where('ticket.userId = :userId', { userId })
            .andWhere('LOWER(TRIM(ticket.title)) = LOWER(TRIM(:title))', { title: trimmedTitle })
            .getOne();

        if (!duplicateTicket) {
            const existingTitles = await this.ticketsRepo.find({
                where: { userId },
                select: ['ticketId', 'title'],
            });

            const hasNormalizedDuplicate = existingTitles.some((ticket) =>
                this.normalizeTitle(ticket.title) === normalizedIncomingTitle,
            );

            if (hasNormalizedDuplicate) {
                throw new ConflictException('A ticket with this title already exists');
            }
        }

        if (duplicateTicket) {
            throw new ConflictException('A ticket with this title already exists');
        }

        const newTicket = this.ticketsRepo.create({
            ...createTicket,
            title: trimmedTitle.replace(/\s+/g, ' '),
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
