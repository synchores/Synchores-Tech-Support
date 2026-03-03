import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsTbl } from './entity/products.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsTbl])
  ],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
