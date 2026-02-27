import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users_tbl')
@ObjectType()
export class UsersTbl {
    @PrimaryGeneratedColumn()
    @Field()
    userId: number;

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
}