import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('inquiry_forms')
@ObjectType()
export class InquiryFormTbl {
    @PrimaryGeneratedColumn()
    @Field()
    inquiryId: number;  

    @Column()
    @Field()
    fullName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    contactNumber: string;

    @Column()
    @Field()
    message: string;

    @Column()
    @Field()
    serviceType: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;
}