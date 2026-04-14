import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyInfoTbl } from './entity/company-info.tbl';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Injectable()
export class CompanyInfoService {
  constructor(
    @InjectRepository(CompanyInfoTbl)
    private companyInfoRepository: Repository<CompanyInfoTbl>,
  ) {}

  async getCompanyInfo(): Promise<CompanyInfoTbl> {
    const info = await this.companyInfoRepository.findOne({
      where: {},
      order: { infoId: 'DESC' },
    });

    if (!info) {
      throw new NotFoundException('Company info not found');
    }

    return info;
  }

  async createCompanyInfo(input: Partial<CompanyInfoTbl>): Promise<CompanyInfoTbl> {
    const info = this.companyInfoRepository.create(input);
    return await this.companyInfoRepository.save(info);
  }

  async updateCompanyInfo(
    input: UpdateCompanyInfoDto,
  ): Promise<CompanyInfoTbl> {
    const info = await this.getCompanyInfo();
    Object.assign(info, input);
    return await this.companyInfoRepository.save(info);
  }
}
