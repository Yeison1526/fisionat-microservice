import {
  Injectable,
  Logger,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './dto/send-mail.dto';
import { ContactRequestDto } from './dto/contact-request.dto';
import { EmailResponseDto } from './dto/email-response.dto';
import { MailMessage } from './enums/mail-message.enum';
import { buildWelcomeHtml } from './templates/welcome.template';
import { buildNotificationHtml } from './templates/notification.template';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendViaBrevo(dto: SendMailDto): Promise<EmailResponseDto> {
    const apiKey = this.configService.get<string>('BREVO_API_KEY');
    const brevoApiUrl = this.configService.get<string>('BREVO_API_URL');
    const mailFrom = this.configService.get<string>('MAIL_FROM');

    if (!apiKey || !brevoApiUrl || !mailFrom) {
      this.logger.error('Faltan variables de entorno de Brevo');
      throw new InternalServerErrorException(MailMessage.SERVER_CONFIG_INCOMPLETE);
    }

    const { senderEmail, senderName } = this.parseFromAddress(mailFrom);

    this.logger.log(`Enviando correo vía Brevo API a: ${dto.to}`);

    try {
      const response = await fetch(brevoApiUrl, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: senderName,
            email: senderEmail,
          },
          to: [
            {
              email: dto.to,
              name: dto.toName || dto.to,
            },
          ],
          subject: dto.subject,
          htmlContent: dto.htmlContent,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        const status = response.status;

        if (status >= 400 && status < 500) {
          this.logger.warn(`Brevo rechazó el envío (${status}): ${errorBody}`);
          throw new UnprocessableEntityException(MailMessage.BREVO_REJECTED);
        }

        this.logger.error(`Error de Brevo (${status}): ${errorBody}`);
        throw new Error(`Brevo rechazó el envío: ${response.statusText}`);
      }

      const data = (await response.json().catch(() => ({}))) as {
        messageId?: string;
      };
      this.logger.log('Correo enviado exitosamente vía Brevo API');

      return {
        success: true,
        message: MailMessage.CONTACT_SUCCESS,
        messageId: data.messageId,
      };
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }

      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Fallo al enviar correo: ${message}`);
      throw new InternalServerErrorException(message);
    }
  }

  async handleContactRequest(dto: ContactRequestDto): Promise<EmailResponseDto> {
    const therapistEmail = this.configService.get<string>('PHYSIO_EMAIL');

    if (!therapistEmail) {
      this.logger.error('Falta PHYSIO_EMAIL para notificar al fisioterapeuta');
      throw new InternalServerErrorException(MailMessage.SERVER_CONFIG_INCOMPLETE);
    }

    const clientHtml = buildWelcomeHtml({
      name: dto.name,
      subject: dto.subject,
    });

    const therapistHtml = buildNotificationHtml(dto);

    const clientResult = await this.sendViaBrevo({
      to: dto.email,
      toName: dto.name,
      subject: `Confirmación: ${dto.subject}`,
      htmlContent: clientHtml,
    });

    const therapistResult = await this.sendViaBrevo({
      to: therapistEmail,
      toName: 'Equipo FisioNat',
      subject: `Nueva consulta: ${dto.name} ${dto.lastName} — ${dto.subject}`,
      htmlContent: therapistHtml,
    });

    this.logger.log(
      `Flujo completado: cliente ${dto.email} + fisio ${therapistEmail}`,
    );

    return {
      success: true,
      message: MailMessage.CONTACT_SUCCESS,
      messageId: clientResult.messageId ?? therapistResult.messageId,
    };
  }

  private parseFromAddress(from: string): { senderEmail: string; senderName: string } {
    const match = from.match(/^(.*)<([^>]+)>$/);
    
    if (match) {
      return {
        senderName: match[1].trim(),
        senderEmail: match[2].trim(),
      };
    }

    return {
      senderName: 'Notificaciones',
      senderEmail: from.trim() || 'no-reply@dominio.com',
    };
  }
}
