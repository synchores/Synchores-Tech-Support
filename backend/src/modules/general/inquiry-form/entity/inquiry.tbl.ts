import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('inquiry_forms')
@ObjectType()
export class InquiryFormTbl {
    @PrimaryGeneratedColumn()
    @Field()
    declare inquiryId: number;  

    @Column()
    @Field()
    declare fullName: string;

    @Column()
    @Field()
    declare email: string;

    @Column()
    @Field()
    declare contactNumber: string;

    @Column()
    @Field()
    declare message: string;

    @Column()
    @Field()
    declare serviceType: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    declare createdAt: Date;
}