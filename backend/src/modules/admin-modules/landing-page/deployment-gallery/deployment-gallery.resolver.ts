import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';
import { DeploymentGalleryService } from './deployment-gallery.service';
import { DeploymentGalleryTbl } from './entity/deployment-gallery.tbl';
import { CreateDeploymentGalleryDto } from './dto/create-deployment-gallery.dto';
import { UpdateDeploymentGalleryDto } from './dto/update-deployment-gallery.dto';
import { ContentStatus } from '../common/content-status.enum';

@Resolver()
export class DeploymentGalleryResolver {
  constructor(
    private readonly deploymentService: DeploymentGalleryService,
  ) {}

  @Query(() => [DeploymentGalleryTbl], { name: 'getAllDeployments' })
  async getAllDeployments(
    @Args('search', { nullable: true }) search?: string,
    @Args('status', { type: () => ContentStatus, nullable: true })
    status?: ContentStatus,
    @Args('category', { nullable: true }) category?: string,
  ) {
    return await this.deploymentService.getAllDeployments(
      search,
      status,
      category,
    );
  }

  @Query(() => DeploymentGalleryTbl, { name: 'getDeployment' })
  async getDeployment(
    @Args('deploymentId', { type: () => Int }) deploymentId: number,
  ) {
    return await this.deploymentService.getDeployment(deploymentId);
  }

  @Mutation(() => DeploymentGalleryTbl, { name: 'createDeployment' })
  async createDeployment(@Args('input') input: CreateDeploymentGalleryDto) {
    return await this.deploymentService.createDeployment(input);
  }

  @Mutation(() => DeploymentGalleryTbl, { name: 'updateDeployment' })
  async updateDeployment(@Args('input') input: UpdateDeploymentGalleryDto) {
    return await this.deploymentService.updateDeployment(input);
  }

  @Mutation(() => Boolean, { name: 'deleteDeployment' })
  async deleteDeployment(
    @Args('deploymentId', { type: () => Int }) deploymentId: number,
  ) {
    return await this.deploymentService.deleteDeployment(deploymentId);
  }

  @Mutation(() => DeploymentGalleryTbl, { name: 'duplicateDeployment' })
  async duplicateDeployment(
    @Args('deploymentId', { type: () => Int }) deploymentId: number,
  ) {
    return await this.deploymentService.duplicateDeployment(deploymentId);
  }

  @Mutation(() => Boolean, { name: 'bulkDeleteDeployments' })
  async bulkDeleteDeployments(
    @Args({ name: 'deploymentIds', type: () => [Int] }) deploymentIds: number[],
  ) {
    return await this.deploymentService.bulkDeleteDeployments(deploymentIds);
  }

  @Mutation(() => [DeploymentGalleryTbl], {
    name: 'bulkUpdateDeploymentStatus',
  })
  async bulkUpdateDeploymentStatus(
    @Args({ name: 'deploymentIds', type: () => [Int] }) deploymentIds: number[],
    @Args('status', { type: () => ContentStatus }) status: ContentStatus,
  ) {
    return await this.deploymentService.bulkUpdateDeploymentStatus(
      deploymentIds,
      status,
    );
  }
}
