import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}