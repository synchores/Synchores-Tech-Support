import { Module } from '@nestjs/common';
import { UsersCrudResolver } from './users-crud.resolver';
import { UsersCrudService } from './users-crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTbl } from 'src/modules/general/auth/entity/users.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersTbl]),
  ],
  providers: [UsersCrudResolver, UsersCrudService]
})
export class UsersCrudModule {}
