import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hero_section_tbl')
@ObjectType()
export class HeroSectionTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare heroId: number;

  @Column()
  @Field()
  declare headline: string;

  @Column()
  @Field()
  declare tagline: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare backgroundImage?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare focusText?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  declare createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  declare updatedAt: Date;
}
