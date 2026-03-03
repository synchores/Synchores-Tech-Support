import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductsTbl } from './entity/products.tbl';
import { CreateProductDto } from './dto/create.products';
import { UpdateProductDto } from './dto/update.products';

@Resolver()
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => [ProductsTbl], { name: 'getProducts' })
    async readProducts() {
        return await this.productsService.readProducts();
    }

    @Mutation(() => ProductsTbl, { name: 'createProduct' })
    async createProduct(@Args('input') input: CreateProductDto) {
        return await this.productsService.createProduct(input);
    }

    @Mutation(() => ProductsTbl, { name: 'updateProduct' })
    async updateProduct(@Args('input') input: UpdateProductDto) {
        return await this.productsService.updateProduct(input);
    }

    @Mutation(() => ProductsTbl, { name: 'deleteProduct' })
    async deleteProduct(@Args('productId', { type: () => Int }) productId: number) {
        return await this.productsService.deleteProduct(productId);
    }
}
