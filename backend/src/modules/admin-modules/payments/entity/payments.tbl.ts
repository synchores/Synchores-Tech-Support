import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoicesTbl } from "../../invoices/entity/invoices.tbl";

@Entity('payments_tbl')
@ObjectType()
export class PaymentsTbl {
    @PrimaryGeneratedColumn()
    @Field()
    declare paymentId: number;

    @Column()
    @Field()
    declare invoiceId: number;

    @ManyToOne(() => InvoicesTbl)
    @JoinColumn({ name: 'invoiceId' })
    declare invoice: InvoicesTbl;

    @Column()
    @Field()
    declare paymentAmount: number;

    @Column()
    @Field()
    declare paymentReference: string;

    @Column()
    @Field()
    declare paymentDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    declare createdAt: Date;
}