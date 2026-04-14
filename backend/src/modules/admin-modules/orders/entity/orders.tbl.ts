import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsTbl } from "../../products/entity/products.tbl";
import { UsersTbl } from "../../../general/auth/entity/users.tbl";
import { OrderStatus } from "./order-status.enum";

@Entity('orders_tbl')
@ObjectType()
export class OrdersTbl {
    @PrimaryGeneratedColumn()
    @Field()
    declare orderId: number;

    @Column()
    @Field()
    declare productId: number;

    @Column()
    @Field()
    declare userId: number;

    @Column()
    @Field()
    declare quantity: number;

    @Column()
    @Field()
    declare unitPrice: number;

    @Column()
    @Field()
    declare totalPrice: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_APPROVAL })
    @Field()
    declare status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    declare createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    declare updatedAt: Date;
    
    @ManyToOne(() => ProductsTbl)
    @JoinColumn({ name: 'productId' })
    declare product: ProductsTbl;

    @ManyToOne(() => UsersTbl)
    @JoinColumn({ name: 'userId' })
    declare user: UsersTbl;
}