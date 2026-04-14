import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { CompanyInfoService } from './company-info.service';
import { CompanyInfoTbl } from './entity/company-info.tbl';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Resolver()
export class CompanyInfoResolver {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  @Query(() => CompanyInfoTbl, { name: 'getCompanyInfo' })
  async getCompanyInfo() {
    return await this.companyInfoService.getCompanyInfo();
  }

  @Mutation(() => CompanyInfoTbl, { name: 'updateCompanyInfo' })
  async updateCompanyInfo(@Args('input') input: UpdateCompanyInfoDto) {
    return await this.companyInfoService.updateCompanyInfo(input);
  }
}
