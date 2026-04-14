import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketsTbl } from "../../../client-modules/tickets/entity/tickets.tbl";

@Entity('services_tbl')
@ObjectType()
export class ServicesTbl {
    @PrimaryGeneratedColumn()
    @Field()
    declare serviceId: number;

    @Column()
    @Field()
    declare serviceName: string;

    @Column()
    @Field()
    declare description: string;

    @Column()
    @Field()
    declare category: string;

    @Column()
    @Field()
    declare image: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    declare createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    declare updatedAt: Date;

    @OneToMany(() => TicketsTbl, (ticket) => ticket.service)
    declare tickets: TicketsTbl[];
}