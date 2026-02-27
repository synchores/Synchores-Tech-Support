import { Module } from '@nestjs/common';
import { TicketsResolver } from './tickets.resolver';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsTbl } from './entity/tickets.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsTbl])
  ],
  providers: [TicketsResolver, TicketsService]
})
export class TicketsModule {}
