import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';
import { Throttle, seconds } from '@nestjs/throttler';
import { LandingServiceCardService } from './landing-service-card.service';
import { LandingServiceCardTbl } from './entity/landing-service-card.tbl';
import { CreateLandingServiceCardDto } from './dto/create-landing-service-card.dto';
import { UpdateLandingServiceCardDto } from './dto/update-landing-service-card.dto';
import { ContentStatus } from '../common/content-status.enum';

@Resolver()
export class LandingServiceCardResolver {
  constructor(
    private readonly serviceCardService: LandingServiceCardService,
  ) {}

  @Query(() => [LandingServiceCardTbl], { name: 'getAllLandingServiceCards' })
  @Throttle({
    default: {
      ttl: seconds(60),
      limit: 60,
    },
  })
  async getAllServiceCards(
    @Args('search', { nullable: true }) search?: string,
    @Args('status', { type: () => ContentStatus, nullable: true })
    status?: ContentStatus,
    @Args('category', { nullable: true }) category?: string,
  ) {
    return await this.serviceCardService.getAllServiceCards(
      search,
      status,
      category,
    );
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

  @Mutation(() => LandingServiceCardTbl, { name: 'duplicateLandingServiceCard' })
  async duplicateServiceCard(
    @Args('cardId', { type: () => Int }) cardId: number,
  ) {
    return await this.serviceCardService.duplicateServiceCard(cardId);
  }

  @Mutation(() => Boolean, { name: 'bulkDeleteLandingServiceCards' })
  async bulkDeleteServiceCards(
    @Args({ name: 'cardIds', type: () => [Int] }) cardIds: number[],
  ) {
    return await this.serviceCardService.bulkDeleteServiceCards(cardIds);
  }

  @Mutation(() => [LandingServiceCardTbl], {
    name: 'bulkUpdateLandingServiceCardStatus',
  })
  async bulkUpdateServiceCardStatus(
    @Args({ name: 'cardIds', type: () => [Int] }) cardIds: number[],
    @Args('status', { type: () => ContentStatus }) status: ContentStatus,
  ) {
    return await this.serviceCardService.bulkUpdateServiceCardStatus(
      cardIds,
      status,
    );
  }
}
