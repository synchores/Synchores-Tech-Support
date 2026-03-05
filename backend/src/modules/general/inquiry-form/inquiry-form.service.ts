import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InquiryFormTbl } from './entity/inquiry.tbl';
import { Repository } from 'typeorm';
import { CreateInquiryFormDto } from './dto/create.inquiry-form.dto';
import { MailerService } from '../mailer/mailer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InquiryFormService {
    private readonly logger = new Logger(InquiryFormService.name);

    constructor(
        @InjectRepository(InquiryFormTbl)
        private readonly inquiryRepo: Repository<InquiryFormTbl>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async createInquiryForm(createInquiryFormDto: CreateInquiryFormDto){
        const inquiry = this.inquiryRepo.create(createInquiryFormDto);
        const savedInquiry = await this.inquiryRepo.save(inquiry);

        void this.sendInquiryNotificationEmails(savedInquiry).catch((error: unknown) => {
            this.logger.error(
                `Inquiry email dispatch failed for inquiry #${savedInquiry.inquiryId}`,
                error instanceof Error ? error.stack : String(error),
            );
        });

        return savedInquiry;
    }

    private async sendInquiryNotificationEmails(inquiry: InquiryFormTbl) {
        const inquiryRecipient =
            this.configService.get<string>('INQUIRY_NOTIFICATION_EMAIL') ??
            this.configService.get<string>('MAIL_FROM');

        const supportSubject = `[Inquiry #${inquiry.inquiryId}] ${inquiry.serviceType}`;

        if (inquiryRecipient) {
            await this.mailerService.sendMail({
                to: inquiryRecipient,
                replyTo: inquiry.email,
                subject: supportSubject,
                text: this.buildSupportNotificationText(inquiry),
                html: this.buildSupportNotificationHtml(inquiry),
            });
        }

        await this.mailerService.sendMail({
            to: inquiry.email,
            subject: 'We received your inquiry',
            text: this.buildClientConfirmationText(inquiry),
            html: this.buildClientConfirmationHtml(inquiry),
        });
    }

    private buildSupportNotificationText(inquiry: InquiryFormTbl) {
        return [
            'New inquiry form submitted',
            `Inquiry ID: ${inquiry.inquiryId}`,
            `Name: ${inquiry.fullName}`,
            `Email: ${inquiry.email}`,
            `Contact Number: ${inquiry.contactNumber}`,
            `Service Type: ${inquiry.serviceType}`,
            `Message: ${inquiry.message}`,
            `Created At: ${inquiry.createdAt.toISOString()}`,
        ].join('\n');
    }

    private buildClientConfirmationText(inquiry: InquiryFormTbl) {
        return [
            `Hi ${inquiry.fullName},`,
            '',
            'Thanks for reaching out to Synchores. We received your inquiry with the details below:',
            `Service Type: ${inquiry.serviceType}`,
            `Reference ID: ${inquiry.inquiryId}`,
            '',
            'Our team will contact you soon.',
            '',
            'Regards,',
            'Synchores Team',
        ].join('\n');
    }

        private buildSupportNotificationHtml(inquiry: InquiryFormTbl) {
                const submittedAt = inquiry.createdAt.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                });

                return `
<!doctype html>
<html>
    <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                        <tr>
                            <td style="background:#0f172a;padding:18px 24px;">
                                <p style="margin:0;color:#93c5fd;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Synchores</p>
                                <h1 style="margin:6px 0 0 0;color:#ffffff;font-size:20px;line-height:1.3;">New Inquiry Received</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:24px;">
                                <p style="margin:0 0 14px 0;font-size:14px;color:#334155;">A new inquiry was submitted from the client portal.</p>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;">
                                    ${this.detailRowHtml('Inquiry ID', `#${inquiry.inquiryId}`)}
                                    ${this.detailRowHtml('Submitted At', submittedAt)}
                                    ${this.detailRowHtml('Name', inquiry.fullName)}
                                    ${this.detailRowHtml('Email', `<a href="mailto:${this.escapeHtml(inquiry.email)}" style="color:#2563eb;text-decoration:none;">${this.escapeHtml(inquiry.email)}</a>`)}
                                    ${this.detailRowHtml('Contact Number', `<a href="tel:${this.escapeHtml(inquiry.contactNumber)}" style="color:#2563eb;text-decoration:none;">${this.escapeHtml(inquiry.contactNumber)}</a>`)}
                                    ${this.detailRowHtml('Service Type', inquiry.serviceType)}
                                </table>
                                <div style="margin-top:16px;">
                                    <p style="margin:0 0 6px 0;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#64748b;">Message</p>
                                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:14px;color:#334155;line-height:1.5;white-space:pre-wrap;">${this.escapeHtml(inquiry.message)}</div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`;
        }

        private buildClientConfirmationHtml(inquiry: InquiryFormTbl) {
                return `
<!doctype html>
<html>
    <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                        <tr>
                            <td style="background:linear-gradient(90deg,#1d4ed8,#4f46e5);padding:24px;">
                                <p style="margin:0;color:#bfdbfe;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Synchores IT Solutions</p>
                                <h1 style="margin:8px 0 0 0;color:#ffffff;font-size:22px;line-height:1.3;">Inquiry Received</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:24px;">
                                <p style="margin:0 0 12px 0;font-size:15px;color:#334155;">Hi <strong>${this.escapeHtml(inquiry.fullName)}</strong>,</p>
                                <p style="margin:0 0 16px 0;font-size:14px;color:#334155;line-height:1.6;">Thank you for contacting Synchores. Your inquiry has been received and our team will review it shortly.</p>

                                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">
                                    <p style="margin:0 0 10px 0;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#64748b;">Inquiry Summary</p>
                                    <p style="margin:0 0 6px 0;font-size:14px;color:#0f172a;"><strong>Reference ID:</strong> #${inquiry.inquiryId}</p>
                                    <p style="margin:0 0 6px 0;font-size:14px;color:#0f172a;"><strong>Service Type:</strong> ${this.escapeHtml(inquiry.serviceType)}</p>
                                    <p style="margin:0;font-size:14px;color:#0f172a;"><strong>Contact:</strong> ${this.escapeHtml(inquiry.email)}</p>
                                </div>

                                <p style="margin:16px 0 0 0;font-size:14px;color:#334155;line-height:1.6;">If you need to update your request, please reply to this email and include your reference ID.</p>
                                <p style="margin:18px 0 0 0;font-size:14px;color:#334155;">Regards,<br /><strong>Synchores Team</strong></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`;
        }

        private detailRowHtml(label: string, value: string) {
                return `
<tr>
    <td style="width:160px;padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#64748b;vertical-align:top;">${this.escapeHtml(label)}</td>
    <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0f172a;">${value}</td>
</tr>`;
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
