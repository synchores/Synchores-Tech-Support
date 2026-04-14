import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';
import { LandingServiceCardService } from './landing-service-card.service';
import { LandingServiceCardTbl } from './entity/landing-service-card.tbl';
import { CreateLandingServiceCardDto } from './dto/create-landing-service-card.dto';
import { UpdateLandingServiceCardDto } from './dto/update-landing-service-card.dto';

@Resolver()
export class LandingServiceCardResolver {
  constructor(
    private readonly serviceCardService: LandingServiceCardService,
  ) {}

  @Query(() => [LandingServiceCardTbl], { name: 'getAllLandingServiceCards' })
  async getAllServiceCards() {
    return await this.serviceCardService.getAllServiceCards();
  }

  @Query(() => LandingServiceCardTbl, { name: 'getLandingServiceCard' })
  async getServiceCard(@Args('cardId', { type: () => Int }) cardId: number) {
    return await this.serviceCardService.getServiceCard(cardId);
  }

  @Mutation(() => LandingServiceCardTbl, { name: 'createLandingServiceCard' })
  async createServiceCard(@Args('input') input: CreateLandingServiceCardDto) {
    return await this.serviceCardService.createServiceCard(input);
  }

  @Mutation(() => LandingServiceCardTbl, { name: 'updateLandingServiceCard' })
  async updateServiceCard(@Args('input') input: UpdateLandingServiceCardDto) {
    return await this.serviceCardService.updateServiceCard(input);
  }

  @Mutation(() => Boolean, { name: 'deleteLandingServiceCard' })
  async deleteServiceCard(@Args('cardId', { type: () => Int }) cardId: number) {
    return await this.serviceCardService.deleteServiceCard(cardId);
  }
}
