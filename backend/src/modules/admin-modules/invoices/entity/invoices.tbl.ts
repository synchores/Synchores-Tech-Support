import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrdersTbl } from '../../orders/entity/orders.tbl';
import { UsersTbl } from '../../../general/auth/entity/users.tbl';

@Entity('invoices_tbl')
@ObjectType()
export class InvoicesTbl {
  @PrimaryGeneratedColumn()
  @Field()
  declare invoiceId: number;

  @Column({ unique: true })
  @Field()
  declare orderId: number;

  @Column()
  @Field()
  declare userId: number;

  @ManyToOne(() => OrdersTbl)
  @JoinColumn({ name: 'orderId' })
  declare order: OrdersTbl;

  @ManyToOne(() => UsersTbl)
  @JoinColumn({ name: 'userId' })
  declare user: UsersTbl;

  @Column({ unique: true })
  @Field()
  declare invoiceNumber: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  declare totalAmount: number;

  @Column({ type: 'timestamp' })
  @Field()
  declare dueDate: Date;

  @Column()
  @Field()
  declare paymentStatus: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  declare createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Field()
  declare updatedAt: Date;
}
