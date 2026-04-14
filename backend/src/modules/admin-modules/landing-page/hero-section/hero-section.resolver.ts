import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { HeroSectionService } from './hero-section.service';
import { HeroSectionTbl } from './entity/hero-section.tbl';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';

@Resolver()
export class HeroSectionResolver {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Query(() => HeroSectionTbl, { name: 'getHeroSection' })
  async getHeroSection() {
    return await this.heroSectionService.getHeroSection();
  }

  @Mutation(() => HeroSectionTbl, { name: 'createHeroSection' })
  async createHeroSection(@Args('input') input: CreateHeroSectionDto) {
    return await this.heroSectionService.createHeroSection(input);
  }

  @Mutation(() => HeroSectionTbl, { name: 'updateHeroSection' })
  async updateHeroSection(@Args('input') input: UpdateHeroSectionDto) {
    return await this.heroSectionService.updateHeroSection(input);
  }
}
