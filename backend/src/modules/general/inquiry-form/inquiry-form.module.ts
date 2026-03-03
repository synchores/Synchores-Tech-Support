import { Module } from '@nestjs/common';
import { InquiryFormResolver } from './inquiry-form.resolver';
import { InquiryFormService } from './inquiry-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InquiryFormTbl } from './entity/inquiry.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([InquiryFormTbl]),
  ],
  providers: [InquiryFormResolver, InquiryFormService]
})
export class InquiryFormModule {}
