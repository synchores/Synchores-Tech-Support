import { Module } from '@nestjs/common';
import { ServicesResolver } from './services.resolver';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesTbl } from './entity/service.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicesTbl])
  ],
  providers: [ServicesResolver, ServicesService]
})
export class ServicesModule {}
