import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products_tbl')
@ObjectType()
export class ProductsTbl {
    @PrimaryGeneratedColumn()
    @Field()
    productId: number;

    @Column()
    @Field()
    productName: string;

    @Column()
    @Field()
    productDescription: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @Field()
    productPrice: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;
}