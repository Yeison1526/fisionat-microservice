import { MailMessage } from '../enums/mail-message.enum';

export class EmailResponseDto {
  success: boolean;
  message: MailMessage | string;
  messageId?: string;
}