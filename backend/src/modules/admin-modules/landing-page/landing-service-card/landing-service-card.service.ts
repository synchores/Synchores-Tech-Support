import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingServiceCardTbl } from './entity/landing-service-card.tbl';
import { CreateLandingServiceCardDto } from './dto/create-landing-service-card.dto';
import { UpdateLandingServiceCardDto } from './dto/update-landing-service-card.dto';

@Injectable()
export class LandingServiceCardService {
  constructor(
    @InjectRepository(LandingServiceCardTbl)
    private cardRepository: Repository<LandingServiceCardTbl>,
  ) {}

  async getAllServiceCards(): Promise<LandingServiceCardTbl[]> {
    return await this.cardRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async createServiceCard(
    input: CreateLandingServiceCardDto,
  ): Promise<LandingServiceCardTbl> {
    const card = this.cardRepository.create(input);
    return await this.cardRepository.save(card);
  }

  async updateServiceCard(
    input: UpdateLandingServiceCardDto,
  ): Promise<LandingServiceCardTbl> {
    const card = await this.cardRepository.findOne({
      where: { cardId: input.cardId },
    });

    if (!card) {
      throw new NotFoundException('Service card not found');
    }

    Object.assign(card, input);
    return await this.cardRepository.save(card);
  }

  async deleteServiceCard(cardId: number): Promise<boolean> {
    const result = await this.cardRepository.delete({ cardId });
    return (result.affected ?? 0) > 0;
  }

  async getServiceCard(cardId: number): Promise<LandingServiceCardTbl> {
    const card = await this.cardRepository.findOne({
      where: { cardId },
    });

    if (!card) {
      throw new NotFoundException('Service card not found');
    }

    return card;
  }
}
