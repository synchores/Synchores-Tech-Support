import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesTbl } from "../modules/admin-modules/services/entity/service.tbl";
import { UsersTbl } from "../modules/general/auth/entity/users.tbl";
import { TicketsTbl } from "../modules/client-modules/tickets/entity/tickets.tbl";
import { OrdersTbl } from "../modules/admin-modules/orders/entity/orders.tbl";
import { InvoicesTbl } from "../modules/admin-modules/invoices/entity/invoices.tbl";
import { ProductsTbl } from "../modules/admin-modules/products/entity/products.tbl";
import { PaymentsTbl } from "../modules/admin-modules/payments/entity/payments.tbl";
import { InquiryFormTbl } from "../modules/general/inquiry-form/entity/inquiry.tbl";
import { HeroSectionTbl } from "../modules/admin-modules/landing-page/hero-section/entity/hero-section.tbl";
import { LandingServiceCardTbl } from "../modules/admin-modules/landing-page/landing-service-card/entity/landing-service-card.tbl";
import { DeploymentGalleryTbl } from "../modules/admin-modules/landing-page/deployment-gallery/entity/deployment-gallery.tbl";
import { CompanyInfoTbl } from "../modules/admin-modules/landing-page/company-info/entity/company-info.tbl";

export const DatabaseConfig =  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [TicketsTbl, UsersTbl, ServicesTbl, OrdersTbl, InvoicesTbl, ProductsTbl, PaymentsTbl, InquiryFormTbl, HeroSectionTbl, LandingServiceCardTbl, DeploymentGalleryTbl, CompanyInfoTbl],
        synchronize: config.get<string>('DB_SYNC') === 'true',
    })
})