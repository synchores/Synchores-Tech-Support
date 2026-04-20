import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company_info_tbl')
@ObjectType()
export class CompanyInfoTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare infoId: number;

  @Column()
  @Field()
  declare address: string;

  @Column()
  @Field()
  declare phoneMain: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare phoneMobile?: string;

  @Column()
  @Field()
  declare email: string;

  @Column({ type: 'text' })
  @Field()
  declare aboutText: string;

  // Optional "What We Do" marketing section content
  @Column({ nullable: true })
  @Field({ nullable: true })
  declare whatWeDoTitle?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare whatWeDoParagraph1?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare whatWeDoParagraph2?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare facebookUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare instagramUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare youtubeUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare aboutEyebrow?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare aboutHeading?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare aboutParagraph2?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare aboutImage1?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare aboutImage2?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare aboutImage1Alt?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare aboutImage2Alt?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare missionLabel?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare missionStatement?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare valuesLabel?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare valuesStatement?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare commitmentEyebrow?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare commitmentHeading?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare commitmentStatement?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare footerBrandText?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare companyLogo?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare companyLogoAlt?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare contactEyebrow?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare contactHeading?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  declare contactIntroText?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare contactBgImage?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  declare contactBgImageAlt?: string;

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
