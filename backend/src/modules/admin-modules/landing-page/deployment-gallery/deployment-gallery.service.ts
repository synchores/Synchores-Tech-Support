import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DeploymentGalleryTbl } from './entity/deployment-gallery.tbl';
import { CreateDeploymentGalleryDto } from './dto/create-deployment-gallery.dto';
import { UpdateDeploymentGalleryDto } from './dto/update-deployment-gallery.dto';
import { ContentStatus } from '../common/content-status.enum';

@Injectable()
export class DeploymentGalleryService {
  constructor(
    @InjectRepository(DeploymentGalleryTbl)
    private deploymentRepository: Repository<DeploymentGalleryTbl>,
  ) {}

  async getAllDeployments(
    search?: string,
    status?: ContentStatus,
    category?: string,
  ): Promise<DeploymentGalleryTbl[]> {
    const deployments = await this.deploymentRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });

    const normalizedSearch = search?.trim().toLowerCase();

    return deployments.filter((deployment) => {
      const matchesSearch =
        !normalizedSearch ||
        deployment.title.toLowerCase().includes(normalizedSearch) ||
        deployment.description.toLowerCase().includes(normalizedSearch) ||
        deployment.category.toLowerCase().includes(normalizedSearch);

      const matchesStatus = !status || deployment.status === status;
      const matchesCategory = !category || deployment.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
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

  async duplicateDeployment(deploymentId: number): Promise<DeploymentGalleryTbl> {
    const deployment = await this.getDeployment(deploymentId);
    const clone = this.deploymentRepository.create({
      title: `${deployment.title} (Copy)`,
      description: deployment.description,
      image: deployment.image,
      category: deployment.category,
      status: ContentStatus.DRAFT,
      order: deployment.order,
    });

    return await this.deploymentRepository.save(clone);
  }

  async bulkDeleteDeployments(deploymentIds: number[]): Promise<boolean> {
    if (!deploymentIds.length) return true;
    const result = await this.deploymentRepository.delete({
      deploymentId: In(deploymentIds),
    });
    return (result.affected ?? 0) > 0;
  }

  async bulkUpdateDeploymentStatus(
    deploymentIds: number[],
    status: ContentStatus,
  ): Promise<DeploymentGalleryTbl[]> {
    if (!deploymentIds.length) return [];

    const deployments = await this.deploymentRepository.find({
      where: { deploymentId: In(deploymentIds) },
    });

    const updatedDeployments = deployments.map((deployment) => {
      deployment.status = status;
      return deployment;
    });

    await this.deploymentRepository.save(updatedDeployments);

    return await this.deploymentRepository.find({
      where: { deploymentId: In(deploymentIds) },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
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
