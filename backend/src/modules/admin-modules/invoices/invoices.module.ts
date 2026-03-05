import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesTbl } from './entity/invoices.tbl';
import { InvoicesResolver } from './invoices.resolver';
import { InvoicesService } from './invoices.service';
import { OrdersTbl } from '../orders/entity/orders.tbl';
import { PaymentsTbl } from '../payments/entity/payments.tbl';
import { UsersTbl } from 'src/modules/general/auth/entity/users.tbl';

@Module({
  imports: [TypeOrmModule.forFeature([InvoicesTbl, OrdersTbl, PaymentsTbl, UsersTbl])],
  providers: [InvoicesResolver, InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
