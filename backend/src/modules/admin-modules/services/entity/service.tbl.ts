import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketsTbl } from "src/modules/client-modules/tickets/entity/tickets.tbl";

@Entity('services_tbl')
@ObjectType()
export class ServicesTbl {
    @PrimaryGeneratedColumn()
    @Field()
    serviceId: number;

    @Column()
    @Field()
    serviceName: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    category: string;

    @Column()
    @Field()
    image: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;

    @OneToMany(() => TicketsTbl, (ticket) => ticket.service)
    tickets: TicketsTbl[];
}