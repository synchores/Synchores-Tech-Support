import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroSectionTbl } from './entity/hero-section.tbl';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';

@Injectable()
export class HeroSectionService {
  constructor(
    @InjectRepository(HeroSectionTbl)
    private heroSectionRepository: Repository<HeroSectionTbl>,
  ) {}

  async getHeroSection(): Promise<HeroSectionTbl> {
    const heroSection = await this.heroSectionRepository.findOne({
      where: {},
      order: { heroId: 'DESC' },
    });

    if (!heroSection) {
      throw new NotFoundException('Hero section not found');
    }

    return heroSection;
  }

  async createHeroSection(
    input: CreateHeroSectionDto,
  ): Promise<HeroSectionTbl> {
    const heroSection = this.heroSectionRepository.create(input);
    return await this.heroSectionRepository.save(heroSection);
  }

  async updateHeroSection(
    input: UpdateHeroSectionDto,
  ): Promise<HeroSectionTbl> {
    const heroSection = await this.heroSectionRepository.findOne({
      where: { heroId: input.heroId },
    });

    if (!heroSection) {
      throw new NotFoundException('Hero section not found');
    }

    Object.assign(heroSection, input);
    return await this.heroSectionRepository.save(heroSection);
  }
}
