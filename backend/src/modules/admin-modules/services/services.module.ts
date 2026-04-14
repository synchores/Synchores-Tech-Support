import { Module } from '@nestjs/common';
import { ServicesResolver } from './services.resolver';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesTbl } from './entity/service.tbl';
import { UsersTbl } from '../../general/auth/entity/users.tbl';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ServicesTbl, UsersTbl]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [ServicesResolver, ServicesService]
})
export class ServicesModule {}
