import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LandingServiceCardTbl } from './entity/landing-service-card.tbl';
import { CreateLandingServiceCardDto } from './dto/create-landing-service-card.dto';
import { UpdateLandingServiceCardDto } from './dto/update-landing-service-card.dto';
import { ContentStatus } from '../common/content-status.enum';

@Injectable()
export class LandingServiceCardService {
  constructor(
    @InjectRepository(LandingServiceCardTbl)
    private cardRepository: Repository<LandingServiceCardTbl>,
  ) {}

  async getAllServiceCards(
    search?: string,
    status?: ContentStatus,
    category?: string,
  ): Promise<LandingServiceCardTbl[]> {
    const cards = await this.cardRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });

    const normalizedSearch = search?.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesSearch =
        !normalizedSearch ||
        card.title.toLowerCase().includes(normalizedSearch) ||
        card.description.toLowerCase().includes(normalizedSearch) ||
        (card.category || '').toLowerCase().includes(normalizedSearch);

      const matchesStatus = !status || card.status === status;
      const matchesCategory = !category || card.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
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

  async duplicateServiceCard(cardId: number): Promise<LandingServiceCardTbl> {
    const card = await this.getServiceCard(cardId);
    const clone = this.cardRepository.create({
      title: `${card.title} (Copy)`,
      description: card.description,
      icon: card.icon,
      image: card.image,
      category: card.category,
      status: ContentStatus.DRAFT,
      order: card.order,
    });

    return await this.cardRepository.save(clone);
  }

  async bulkDeleteServiceCards(cardIds: number[]): Promise<boolean> {
    if (!cardIds.length) return true;
    const result = await this.cardRepository.delete({ cardId: In(cardIds) });
    return (result.affected ?? 0) > 0;
  }

  async bulkUpdateServiceCardStatus(
    cardIds: number[],
    status: ContentStatus,
  ): Promise<LandingServiceCardTbl[]> {
    if (!cardIds.length) return [];

    const cards = await this.cardRepository.find({
      where: { cardId: In(cardIds) },
    });

    const updatedCards = cards.map((card) => {
      card.status = status;
      return card;
    });

    await this.cardRepository.save(updatedCards);

    return await this.cardRepository.find({
      where: { cardId: In(cardIds) },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
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
