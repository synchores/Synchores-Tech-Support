import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';
import { DeploymentGalleryService } from './deployment-gallery.service';
import { DeploymentGalleryTbl } from './entity/deployment-gallery.tbl';
import { CreateDeploymentGalleryDto } from './dto/create-deployment-gallery.dto';
import { UpdateDeploymentGalleryDto } from './dto/update-deployment-gallery.dto';

@Resolver()
export class DeploymentGalleryResolver {
  constructor(
    private readonly deploymentService: DeploymentGalleryService,
  ) {}

  @Query(() => [DeploymentGalleryTbl], { name: 'getAllDeployments' })
  async getAllDeployments() {
    return await this.deploymentService.getAllDeployments();
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
}
