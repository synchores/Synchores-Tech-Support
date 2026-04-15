import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ContentStatus } from '../../common/content-status.enum';

@Entity('landing_service_card_tbl')
@ObjectType()
export class LandingServiceCardTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare cardId: number;

  @Column()
  @Field()
  declare title: string;

  @Column()
  @Field()
  declare description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare icon?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare image?: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  @Field({ nullable: true })
  declare category?: string;

  @Column({
    type: 'enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
  })
  @Field(() => ContentStatus)
  declare status: ContentStatus;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  declare order: number;

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
