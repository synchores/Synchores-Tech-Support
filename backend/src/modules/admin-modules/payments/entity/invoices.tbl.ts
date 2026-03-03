import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrdersTbl } from "../../orders/entity/orders.tbl";
import { UsersTbl } from "src/modules/general/auth/entity/users.tbl";

@Entity('invoices_tbl')
@ObjectType()
export class InvoicesTbl{
    @PrimaryGeneratedColumn()
    @Field()
    invoiceId: number;

    @Column()
    @Field()
    orderId: number;

    @Column()
    @Field()
    userId: number;

    @ManyToOne(() => OrdersTbl)
    @JoinColumn({ name: 'orderId' })
    order: OrdersTbl;

    @ManyToOne(() => UsersTbl)
    @JoinColumn({ name: 'userId' })
    user: UsersTbl;

    @Column()
    @Field()
    invoiceNumber: string;

    @Column()
    @Field()
    totalAmount: number;

    @Column()
    @Field()
    dueDate: Date;

    @Column()
    @Field()
    paymentStatus: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;

    
}