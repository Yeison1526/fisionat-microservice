import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MailMessage } from '../enums/mail-message.enum';

export class EmailResponseDto {
  @ApiProperty({
    description: 'Indica si la operación se completó correctamente.',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Mensaje de resultado de la operación.',
    oneOf: [
      { type: 'string', enum: Object.values(MailMessage) },
      { type: 'string' },
    ],
    example: MailMessage.CONTACT_SUCCESS,
  })
  message: MailMessage | string;

  @ApiPropertyOptional({
    description: 'Identificador del mensaje retornado por el proveedor de correo, si está disponible.',
    example: '<20260410.123456.abcdef@smtp-relay.brevo.com>',
  })
  messageId?: string;
}