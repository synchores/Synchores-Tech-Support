import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { InquiryFormService } from './inquiry-form.service';
import { InquiryFormTbl } from './entity/inquiry.tbl';
import { CreateInquiryFormDto } from './dto/create.inquiry-form.dto';

@Resolver()
export class InquiryFormResolver {
    constructor(private readonly inquiryFormService: InquiryFormService) {}

    @Mutation(() => InquiryFormTbl)
    async createInquiryForm(@Args('input') input: CreateInquiryFormDto) {
        return await this.inquiryFormService.createInquiryForm(input);
    }
}
