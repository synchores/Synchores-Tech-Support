import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deployment_gallery_tbl')
@ObjectType()
export class DeploymentGalleryTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare deploymentId: number;

  @Column()
  @Field()
  declare title: string;

  @Column()
  @Field()
  declare description: string;

  @Column()
  @Field()
  declare image: string;

  @Column()
  @Field()
  declare category: string;

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
