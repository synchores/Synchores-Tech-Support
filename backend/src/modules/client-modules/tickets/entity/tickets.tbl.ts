import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    @Field()
    deadline: Date;

    @Column({ type: "text"})
    @Field()
    attachments: string;

    @Column({ default: 'pending' })
    @Field()
    status: string; 

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;
}