import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { EmailDomainExists } from '../validators/email-domain.validator';

export class SendMailDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail(
    { require_tld: true, allow_utf8_local_part: false, ignore_max_length: true },
    { message: 'El correo no está bien escrito' },
  )
  @IsNotEmpty({ message: 'El correo del destinatario es obligatorio' })
  @MaxLength(254)
  @EmailDomainExists({ message: 'El dominio del correo no existe o no puede recibir correos' })
  to: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsOptional()
  @IsString()
  @MaxLength(255)
  toName?: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty({ message: 'El asunto es obligatorio' })
  @MaxLength(255)
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'El contenido HTML es obligatorio' })
  @MaxLength(100_000)
  htmlContent: string;
}
