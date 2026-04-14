import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { HeroSectionTbl } from './hero-section/entity/hero-section.tbl';
import { LandingServiceCardTbl } from './landing-service-card/entity/landing-service-card.tbl';
import { DeploymentGalleryTbl } from './deployment-gallery/entity/deployment-gallery.tbl';
import { CompanyInfoTbl } from './company-info/entity/company-info.tbl';

// Services
import { HeroSectionService } from './hero-section/hero-section.service';
import { LandingServiceCardService } from './landing-service-card/landing-service-card.service';
import { DeploymentGalleryService } from './deployment-gallery/deployment-gallery.service';
import { CompanyInfoService } from './company-info/company-info.service';

// Resolvers
import { HeroSectionResolver } from './hero-section/hero-section.resolver';
import { LandingServiceCardResolver } from './landing-service-card/landing-service-card.resolver';
import { DeploymentGalleryResolver } from './deployment-gallery/deployment-gallery.resolver';
import { CompanyInfoResolver } from './company-info/company-info.resolver';

// Controllers
import { FileUploadController } from './file-upload/file-upload.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      HeroSectionTbl,
      LandingServiceCardTbl,
      DeploymentGalleryTbl,
      CompanyInfoTbl,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    HeroSectionService,
    LandingServiceCardService,
    DeploymentGalleryService,
    CompanyInfoService,
    HeroSectionResolver,
    LandingServiceCardResolver,
    DeploymentGalleryResolver,
    CompanyInfoResolver,
  ],
  controllers: [FileUploadController],
  exports: [
    HeroSectionService,
    LandingServiceCardService,
    DeploymentGalleryService,
    CompanyInfoService,
  ],
})
export class LandingPageModule {}
