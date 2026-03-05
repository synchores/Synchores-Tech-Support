import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketStatusResolver } from './ticket-status.resolver';
import { TicketStatusService } from './ticket-status.service';
import { TicketsTbl } from 'src/modules/client-modules/tickets/entity/tickets.tbl';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsTbl])
  ],
  providers: [TicketStatusResolver, TicketStatusService]
})
export class TicketStatusModule {}
