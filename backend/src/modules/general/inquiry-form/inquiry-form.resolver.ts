import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { Throttle, seconds } from '@nestjs/throttler';
import { InquiryFormService } from './inquiry-form.service';
import { InquiryFormTbl } from './entity/inquiry.tbl';
import { CreateInquiryFormDto } from './dto/create.inquiry-form.dto';

@Resolver()
export class InquiryFormResolver {
    constructor(private readonly inquiryFormService: InquiryFormService) {}

    @Mutation(() => InquiryFormTbl)
    @Throttle({
        default: {
            limit: 3,
            ttl: seconds(60),
        },
    })
    async createInquiryForm(@Args('input') input: CreateInquiryFormDto) {
        return await this.inquiryFormService.createInquiryForm(input);
    }
}
