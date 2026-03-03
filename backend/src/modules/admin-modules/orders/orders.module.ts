import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersTbl } from './entity/orders.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersTbl])
  ],
  providers: [OrdersResolver, OrdersService]
})
export class OrdersModule {}
