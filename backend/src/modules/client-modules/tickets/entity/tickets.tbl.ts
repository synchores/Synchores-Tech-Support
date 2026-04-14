import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersTbl } from "../../../general/auth/entity/users.tbl";
import { ServicesTbl } from "../../../admin-modules/services/entity/service.tbl";

@Entity('tickets_tbl')
@ObjectType()
export class TicketsTbl {
    @PrimaryGeneratedColumn()
    @Field()
    declare ticketId: number;

    @Column()
    @Field()
    declare userId: number;

    @Column()
    @Field()
    declare serviceId: number;

    @Column()
    @Field()
    declare title: string;

    @Column()
    @Field()
    declare description: string;

    @Column()
    @Field()
    declare priority: string;

    @Column({ type: 'datetime' })
    @Field()
    declare deadline: Date;

    @Column({ type: "text", nullable: true })
    @Field({ nullable: true })
    attachments?: string;

    @Column({ default: 'pending' })
    @Field()
    declare status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    declare createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    declare updatedAt: Date;

    @ManyToOne(() => UsersTbl, (user) => user.tickets, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    declare user: UsersTbl;

    @ManyToOne(() => ServicesTbl, (service) => service.tickets, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'serviceId' })
    declare service: ServicesTbl;
}