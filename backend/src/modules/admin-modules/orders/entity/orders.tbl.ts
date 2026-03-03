import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsTbl } from "../../products/entity/products.tbl";
import { UsersTbl } from "src/modules/general/auth/entity/users.tbl";

@Entity('orders_tbl')
@ObjectType()
export class OrdersTbl {
    @PrimaryGeneratedColumn()
    @Field()
    orderId: number;

    @Column()
    @Field()
    productId: number;

    @Column()
    @Field()
    userId: number

    @Column()
    @Field()
    quantity: number;

    @Column()
    @Field()
    unitPrice: number;

    @Column()
    @Field()
    totalPrice: number;

    @Column()
    @Field()
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;
    
    @ManyToOne(() => ProductsTbl)
    @JoinColumn({ name: 'productId' })
    product: ProductsTbl;

    @ManyToOne(() => UsersTbl)
    @JoinColumn({ name: 'userId' })
    user: UsersTbl;
}