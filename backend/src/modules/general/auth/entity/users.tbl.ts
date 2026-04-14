import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketsTbl } from "../../../client-modules/tickets/entity/tickets.tbl";


@Entity('users_tbl')
@ObjectType()
export class UsersTbl {
    @PrimaryGeneratedColumn()
    @Field()
    declare userId: number;

    @Column({ type: 'json', nullable: true })
    @Field(() => [Int], { nullable: true })
    declare clientServicesId?: number[];

    @Column({ unique: true })
    @Field()
    declare firstName: string;

    @Column({ unique: true })
    @Field()
    declare middleName: string;

    @Column({ unique: true })
    @Field()
    declare lastName: string;

    @Column({ unique: true })
    @Field()
    declare emailAddress: string;

    @Column()
    @Field()
    declare companyName: string;

    @Column()
    @Field()
    declare address: string;

    @Column()
    @Field()
    declare phoneNumber: string;

    @Column()
    @Field()
    declare password: string;

    @Column({ default: 'client' })
    @Field()
    declare role: string;

    @Column()
    @Field()
    declare profPicture?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    declare createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    declare updatedAt: Date;

    @OneToMany(() => TicketsTbl, (ticket) => ticket.user)
    declare tickets: TicketsTbl[];

    @Field()
    get fullName(): string {
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }
}