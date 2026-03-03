import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InquiryFormTbl } from './entity/inquiry.tbl';
import { Repository } from 'typeorm';
import { CreateInquiryFormDto } from './dto/create.inquiry-form.dto';

@Injectable()
export class InquiryFormService {
    constructor(@InjectRepository(InquiryFormTbl) private readonly inquiryRepo: Repository<InquiryFormTbl>) {}   

    async createInquiryForm(createInquiryFormDto: CreateInquiryFormDto){
        const inquiry = this.inquiryRepo.create(createInquiryFormDto);
        return await this.inquiryRepo.save(inquiry);
    }
}
