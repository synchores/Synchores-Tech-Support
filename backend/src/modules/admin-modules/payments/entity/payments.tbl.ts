import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoicesTbl } from "../../invoices/entity/invoices.tbl";

@Entity('payments_tbl')
@ObjectType()
export class PaymentsTbl {
    @PrimaryGeneratedColumn()
    @Field()
    paymentId: number;

    @Column()
    @Field()
    invoiceId: number;

    @ManyToOne(() => InvoicesTbl)
    @JoinColumn({ name: 'invoiceId' })
    invoice: InvoicesTbl;

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