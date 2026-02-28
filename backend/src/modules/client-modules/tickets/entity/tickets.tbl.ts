import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersTbl } from "src/modules/general/auth/entity/users.tbl";
import { ServicesTbl } from "src/modules/admin-modules/services/entity/service.tbl";

@Entity('tickets_tbl')
@ObjectType()
export class TicketsTbl {
    @PrimaryGeneratedColumn()
    @Field()
    ticketId: number;

    @Column()
    @Field()
    userId: number;

    @Column()
    @Field()
    serviceId: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    priority: string;

    @Column({ type: 'datetime' })
    @Field()
    deadline: Date;

    @Column({ type: "text", nullable: true })
    @Field({ nullable: true })
    attachments?: string;

    @Column({ default: 'pending' })
    @Field()
    status: string; 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;

    @ManyToOne(() => UsersTbl, (user) => user.tickets, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: UsersTbl;

    @ManyToOne(() => ServicesTbl, (service) => service.tickets, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'serviceId' })
    service: ServicesTbl;
}