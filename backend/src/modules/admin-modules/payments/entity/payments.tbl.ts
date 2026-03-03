import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments_tbl')
@ObjectType()
export class PaymentsTbl {
    @PrimaryGeneratedColumn()
    @Field()
    paymentId: number;

    @Column()
    @Field()
    invoiceId: number;

    @ManyToOne(() => PaymentsTbl)
    @JoinColumn({ name: 'invoiceId' })
    invoice: PaymentsTbl;

    @Column()
    @Field()
    paymentAmount: number;

    @Column()
    @Field()
    paymentReference: string;

    @Column()
    @Field()
    paymentDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;
}