import { Module } from '@nestjs/common';
import { TicketStatusResolver } from './ticket-status.resolver';
import { TicketStatusService } from './ticket-status.service';

@Module({
  providers: [TicketStatusResolver, TicketStatusService]
})
export class TicketStatusModule {}
