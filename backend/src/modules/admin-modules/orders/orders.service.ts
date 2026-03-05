import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersTbl } from './entity/orders.tbl';
import { CreateOrderDto } from './dto/create.order';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update.order';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderStatus } from './entity/order-status.enum';
import { TransitionOrderStatusDto } from './dto/transition.order-status';
import { InvoicesService } from '../invoices/invoices.service';
import { ProductsTbl } from '../products/entity/products.tbl';
import { UsersTbl } from 'src/modules/general/auth/entity/users.tbl';
import { InvoicesTbl } from '../invoices/entity/invoices.tbl';
import { MailerService } from '../../general/mailer/mailer.service';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(
        @InjectRepository(OrdersTbl)
        private readonly ordersRepository: Repository<OrdersTbl>,
        @InjectRepository(ProductsTbl)
        private readonly productsRepository: Repository<ProductsTbl>,
        @InjectRepository(UsersTbl)
        private readonly usersRepository: Repository<UsersTbl>,
        private readonly invoicesService: InvoicesService,
        private readonly mailerService: MailerService,
    ) {}

    private readonly validTransitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.PENDING_APPROVAL]: [OrderStatus.APPROVED, OrderStatus.REJECTED],
        [OrderStatus.APPROVED]: [OrderStatus.ORDERED_FROM_SUPPLIER],
        [OrderStatus.REJECTED]: [],
        [OrderStatus.ORDERED_FROM_SUPPLIER]: [OrderStatus.READY_FOR_BILLING],
        [OrderStatus.READY_FOR_BILLING]: [OrderStatus.PAID],
        [OrderStatus.PAID]: [OrderStatus.DELIVERED],
        [OrderStatus.DELIVERED]: [],
    };

    // ADMIN SIDE ORDER FUNCTIONS

    // for admin to view all orders
    async allOrders(){
        return await this.ordersRepository.find();
    }

    async orderDetails(orderId: number){
        return await this.ordersRepository.findOne({ where: { orderId } });
    }

    // CLIENTS SIDE ORDER FUNCTIONS
    // for clients to view their own orders
    async clientOrders(userId: number){
        return await this.ordersRepository.find({ where: { userId } });
    }

    async createOrder(createOrderDto: CreateOrderDto){
        const product = await this.productsRepository.findOne({
            where: { productId: createOrderDto.productId },
        });

        if (!product) {
            throw new NotFoundException(
                `Product ${createOrderDto.productId} not found. Please refresh products and try again.`,
            );
        }

        const order = this.ordersRepository.create({
            ...createOrderDto,
            status: createOrderDto.status ?? OrderStatus.PENDING_APPROVAL,
        });
        return await this.ordersRepository.save(order);
    }

    
    async updateOrder(updateOrderDto: UpdateOrderDto){
        const order = await this.ordersRepository.findOne({ where: { orderId: updateOrderDto.orderId } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const previousStatus = order.status as OrderStatus;
        const { orderId, ...updates } = updateOrderDto;

        if (updates.status && updates.status !== order.status) {
            this.assertTransitionAllowed(order.status as OrderStatus, updates.status as OrderStatus);

            if (updates.status === OrderStatus.DELIVERED) {
                await this.assertInvoicePaidForDelivery(order.orderId);
            }
        }

        Object.assign(order, updates);

        const savedOrder = await this.ordersRepository.save(order);

        let invoiceForNotification: InvoicesTbl | null = null;
        if (savedOrder.status === OrderStatus.READY_FOR_BILLING) {
            invoiceForNotification = await this.invoicesService.createInvoiceForOrder(savedOrder);
        }

        if (updates.status && previousStatus !== (savedOrder.status as OrderStatus)) {
            void this.sendOrderStatusNotificationEmail(
                savedOrder,
                previousStatus,
                invoiceForNotification,
            ).catch((error: unknown) => {
                this.logger.error(
                    `Order status email dispatch failed for order #${savedOrder.orderId}`,
                    error instanceof Error ? error.stack : String(error),
                );
            });
        }

        return savedOrder;
    }

    async transitionOrderStatus(transitionDto: TransitionOrderStatusDto) {
        const order = await this.ordersRepository.findOne({ where: { orderId: transitionDto.orderId } });
        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const currentStatus = order.status as OrderStatus;
        this.assertTransitionAllowed(currentStatus, transitionDto.nextStatus);

        if (transitionDto.nextStatus === OrderStatus.DELIVERED) {
            await this.assertInvoicePaidForDelivery(order.orderId);
        }

        order.status = transitionDto.nextStatus;
        const updatedOrder = await this.ordersRepository.save(order);

        let invoiceForNotification: InvoicesTbl | null = null;
        if (updatedOrder.status === OrderStatus.READY_FOR_BILLING) {
            invoiceForNotification = await this.invoicesService.createInvoiceForOrder(updatedOrder);
        }

        void this.sendOrderStatusNotificationEmail(
            updatedOrder,
            currentStatus,
            invoiceForNotification,
        ).catch((error: unknown) => {
            this.logger.error(
                `Order status email dispatch failed for order #${updatedOrder.orderId}`,
                error instanceof Error ? error.stack : String(error),
            );
        });

        return updatedOrder;
    }

    private assertTransitionAllowed(currentStatus: OrderStatus, nextStatus: OrderStatus) {
        const allowedNextStatuses = this.validTransitions[currentStatus] ?? [];

        if (!allowedNextStatuses.includes(nextStatus)) {
            throw new BadRequestException(
                `Invalid order status transition from ${currentStatus} to ${nextStatus}`,
            );
        }
    }

    private async assertInvoicePaidForDelivery(orderId: number) {
        const invoice = await this.invoicesService.getInvoiceByOrderId(orderId);

        if (!invoice) {
            throw new BadRequestException(
                'Cannot mark as DELIVERED before invoice is generated and paid.',
            );
        }

        if (String(invoice.paymentStatus).toUpperCase() !== 'PAID') {
            throw new BadRequestException(
                `Cannot mark as DELIVERED while invoice is ${invoice.paymentStatus}.`,
            );
        }
    }

    private async sendOrderStatusNotificationEmail(
        order: OrdersTbl,
        previousStatus: OrderStatus,
        invoiceHint?: InvoicesTbl | null,
    ) {
        const user = await this.usersRepository.findOne({
            where: { userId: order.userId },
        });

        if (!user?.emailAddress) {
            this.logger.warn(`Skipped order status email for order #${order.orderId}: user email not found.`);
            return;
        }

        let invoice = invoiceHint ?? null;
        if (!invoice) {
            invoice = await this.invoicesService.getInvoiceByOrderId(order.orderId);
        }

        const statusLabel = this.formatStatus(order.status);
        const previousStatusLabel = this.formatStatus(previousStatus);
        const statusMessage = this.getStatusMessage(order.status as OrderStatus);
        const paymentLine = invoice
            ? `Invoice ${invoice.invoiceNumber} is currently ${invoice.paymentStatus}.`
            : 'Invoice details will be shared once billing is generated.';

        await this.mailerService.sendMail({
            to: user.emailAddress,
            subject: `Order #${order.orderId} update: ${statusLabel}`,
            text: [
                `Hi ${user.firstName},`,
                '',
                `Your order #${order.orderId} status changed from ${previousStatusLabel} to ${statusLabel}.`,
                statusMessage,
                '',
                `Order Total: ${Number(order.totalPrice).toFixed(2)}`,
                paymentLine,
                invoice?.dueDate ? `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}` : '',
                '',
                'Regards,',
                'Synchores Team',
            ]
                .filter(Boolean)
                .join('\n'),
            html: this.buildOrderStatusEmailHtml({
                firstName: user.firstName,
                orderId: order.orderId,
                previousStatus: previousStatusLabel,
                currentStatus: statusLabel,
                statusMessage,
                totalPrice: Number(order.totalPrice),
                invoiceNumber: invoice?.invoiceNumber,
                paymentStatus: invoice?.paymentStatus,
                dueDate: invoice?.dueDate,
            }),
        });
    }

    private getStatusMessage(status: OrderStatus) {
        switch (status) {
            case OrderStatus.PENDING_APPROVAL:
                return 'Your request is waiting for admin review.';
            case OrderStatus.APPROVED:
                return 'Good news: your order has been approved.';
            case OrderStatus.REJECTED:
                return 'Your order was not approved. Our team can help with alternatives.';
            case OrderStatus.ORDERED_FROM_SUPPLIER:
                return 'Your requested items were ordered from our supplier.';
            case OrderStatus.READY_FOR_BILLING:
                return 'Your order is ready for billing. Please review your invoice details.';
            case OrderStatus.PAID:
                return 'Payment has been received successfully.';
            case OrderStatus.DELIVERED:
                return 'Your order has been delivered. Thank you for choosing Synchores.';
            default:
                return 'Your order has been updated.';
        }
    }

    private formatStatus(status: string) {
        return status
            .toLowerCase()
            .split('_')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    }

    private buildOrderStatusEmailHtml(params: {
        firstName: string;
        orderId: number;
        previousStatus: string;
        currentStatus: string;
        statusMessage: string;
        totalPrice: number;
        invoiceNumber?: string;
        paymentStatus?: string;
        dueDate?: Date;
    }) {
        const dueDate = params.dueDate ? new Date(params.dueDate).toLocaleDateString() : 'TBD';

        return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:20px 24px;">
                <p style="margin:0;color:#93c5fd;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Synchores</p>
                <h1 style="margin:8px 0 0 0;color:#ffffff;font-size:20px;line-height:1.3;">Order Status Updated</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <p style="margin:0 0 12px 0;font-size:14px;color:#334155;">Hi <strong>${this.escapeHtml(params.firstName)}</strong>,</p>
                <p style="margin:0 0 14px 0;font-size:14px;color:#334155;line-height:1.6;">Your order <strong>#${params.orderId}</strong> moved from <strong>${this.escapeHtml(params.previousStatus)}</strong> to <strong>${this.escapeHtml(params.currentStatus)}</strong>.</p>
                <p style="margin:0 0 16px 0;font-size:14px;color:#0f172a;">${this.escapeHtml(params.statusMessage)}</p>

                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">
                  <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#64748b;">Order Summary</p>
                  <p style="margin:0 0 6px 0;font-size:14px;color:#0f172a;"><strong>Total:</strong> ${params.totalPrice.toFixed(2)}</p>
                  <p style="margin:0 0 6px 0;font-size:14px;color:#0f172a;"><strong>Invoice:</strong> ${this.escapeHtml(params.invoiceNumber ?? 'Pending')}</p>
                  <p style="margin:0 0 6px 0;font-size:14px;color:#0f172a;"><strong>Payment Status:</strong> ${this.escapeHtml(params.paymentStatus ?? 'Pending')}</p>
                  <p style="margin:0;font-size:14px;color:#0f172a;"><strong>Due Date:</strong> ${this.escapeHtml(dueDate)}</p>
                </div>

                <p style="margin:16px 0 0 0;font-size:13px;color:#64748b;">Please check your client portal for the latest order details.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
    }

    private escapeHtml(value: string) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}
