import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersTbl } from './entity/orders.tbl';
import { InvoicesModule } from '../invoices/invoices.module';
import { ProductsTbl } from '../products/entity/products.tbl';
import { UsersTbl } from '../../general/auth/entity/users.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersTbl, ProductsTbl, UsersTbl]),
    InvoicesModule,
  ],
  providers: [OrdersResolver, OrdersService]
})
export class OrdersModule {}
