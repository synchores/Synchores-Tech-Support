import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesTbl } from "src/modules/admin-modules/services/entity/service.tbl";
import { UsersTbl } from "src/modules/general/auth/entity/users.tbl";
import { TicketsTbl } from "src/modules/client-modules/tickets/entity/tickets.tbl";
import { OrdersTbl } from "src/modules/admin-modules/orders/entity/orders.tbl";
import { InvoicesTbl } from "src/modules/admin-modules/invoices/entity/invoices.tbl";
import { ProductsTbl } from "src/modules/admin-modules/products/entity/products.tbl";
import { PaymentsTbl } from "src/modules/admin-modules/payments/entity/payments.tbl";
import { InquiryFormTbl } from "src/modules/general/inquiry-form/entity/inquiry.tbl";

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
        entities: [TicketsTbl, UsersTbl, ServicesTbl, OrdersTbl, InvoicesTbl, ProductsTbl, PaymentsTbl, InquiryFormTbl],
        synchronize: config.get<string>('DB_SYNC') === 'true',
    })
})