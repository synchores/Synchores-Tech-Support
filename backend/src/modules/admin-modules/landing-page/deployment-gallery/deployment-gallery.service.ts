import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeploymentGalleryTbl } from './entity/deployment-gallery.tbl';
import { CreateDeploymentGalleryDto } from './dto/create-deployment-gallery.dto';
import { UpdateDeploymentGalleryDto } from './dto/update-deployment-gallery.dto';

@Injectable()
export class DeploymentGalleryService {
  constructor(
    @InjectRepository(DeploymentGalleryTbl)
    private deploymentRepository: Repository<DeploymentGalleryTbl>,
  ) {}

  async getAllDeployments(): Promise<DeploymentGalleryTbl[]> {
    return await this.deploymentRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async createDeployment(
    input: CreateDeploymentGalleryDto,
  ): Promise<DeploymentGalleryTbl> {
    const deployment = this.deploymentRepository.create(input);
    return await this.deploymentRepository.save(deployment);
  }

  async updateDeployment(
    input: UpdateDeploymentGalleryDto,
  ): Promise<DeploymentGalleryTbl> {
    const deployment = await this.deploymentRepository.findOne({
      where: { deploymentId: input.deploymentId },
    });

    if (!deployment) {
      throw new NotFoundException('Deployment not found');
    }

    Object.assign(deployment, input);
    return await this.deploymentRepository.save(deployment);
  }

  async deleteDeployment(deploymentId: number): Promise<boolean> {
    const result = await this.deploymentRepository.delete({ deploymentId });
    return (result.affected ?? 0) > 0;
  }

  async getDeployment(deploymentId: number): Promise<DeploymentGalleryTbl> {
    const deployment = await this.deploymentRepository.findOne({
      where: { deploymentId },
    });

    if (!deployment) {
      throw new NotFoundException('Deployment not found');
    }

    return deployment;
  }
}
