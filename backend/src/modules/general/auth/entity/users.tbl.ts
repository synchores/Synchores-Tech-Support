import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketsTbl } from "src/modules/client-modules/tickets/entity/tickets.tbl";

@Entity('users_tbl')
@ObjectType()
export class UsersTbl {
    @PrimaryGeneratedColumn()
    @Field()
    userId: number;

    @Column({ type: 'json', nullable: true })
    @Field(() => [Int], { nullable: true })
    clientServicesId?: number[];

    @Column({ unique: true })
    @Field()
    firstName: string;

    @Column({ unique: true })
    @Field()
    middleName: string;

    @Column({ unique: true })
    @Field()
    lastName: string;

    @Column({ unique: true })
    @Field()
    emailAddress: string;

    @Column()
    @Field()
    companyName: string;

    @Column()
    @Field()
    address: string;

    @Column()
    @Field()
    phoneNumber: string;

    @Column()
    password: string;

    @Column({ default: 'client' })
    @Field()
    role: string;

    @Column()
    @Field()
    profPicture?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;

    @OneToMany(() => TicketsTbl, (ticket) => ticket.user)
    tickets: TicketsTbl[];

    @Field()
    get fullName(): string {
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }
}