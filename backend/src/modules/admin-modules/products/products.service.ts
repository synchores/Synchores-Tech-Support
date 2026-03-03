import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsTbl } from './entity/products.tbl';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create.products';
import { UpdateProductDto } from './dto/update.products';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(ProductsTbl) private readonly productsRepo: Repository<ProductsTbl>) {}

    async readProducts(){
        return await this.productsRepo.find();
    }

    async createProduct(createProductDto: CreateProductDto){
        const product = this.productsRepo.create(createProductDto);
        return await this.productsRepo.save(product);
    }

    async updateProduct(updateProductDto: UpdateProductDto){
        const product = await this.productsRepo.findOne({ where: { productId: updateProductDto.productId } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        const { productId, ...updates } = updateProductDto;
        Object.assign(product, updates);
        return await this.productsRepo.save(product);
    }

    async deleteProduct(productId: number){
        const product = await this.productsRepo.findOne({ where: { productId } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return await this.productsRepo.remove(product);
    }
}