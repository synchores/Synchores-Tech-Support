import { Module } from '@nestjs/common';
import { ServiceReqResolver } from './service-req.resolver';
import { ServiceReqService } from './service-req.service';

@Module({
  providers: [ServiceReqResolver, ServiceReqService]
})
export class ServiceReqModule {}
