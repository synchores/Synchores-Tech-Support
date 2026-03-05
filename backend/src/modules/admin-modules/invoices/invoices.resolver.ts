import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { InvoicesTbl } from './entity/invoices.tbl';

@Resolver(() => InvoicesTbl)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Query(() => InvoicesTbl, { name: 'invoiceByOrderId', nullable: true })
  async invoiceByOrderId(@Args('orderId', { type: () => Int }) orderId: number) {
    return this.invoicesService.getInvoiceByOrderId(orderId);
  }

  @Mutation(() => InvoicesTbl, { name: 'payInvoiceByOrderId' })
  async payInvoiceByOrderId(@Args('orderId', { type: () => Int }) orderId: number) {
    return this.invoicesService.payInvoiceByOrderId(orderId);
  }
}
