import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products_tbl')
@ObjectType()
export class ProductsTbl {
    @PrimaryGeneratedColumn()
    @Field()
    declare productId: number;

    @Column()
    @Field()
    declare productName: string;

    @Column()
    @Field()
    declare productDescription: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @Field()
    declare productPrice: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    declare createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    declare updatedAt: Date;
}