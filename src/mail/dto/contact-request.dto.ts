import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmailDomainExists } from '../validators/email-domain.validator';

export class ContactRequestDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100)
  name: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'Los apellidos deben ser texto' })
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail(
    { require_tld: true, allow_utf8_local_part: false, ignore_max_length: true },
    { message: 'El correo electrónico no está bien escrito' },
  )
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @MaxLength(254)
  @EmailDomainExists({ message: 'El dominio del correo no existe o no puede recibir correos' })
  email: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El celular debe ser texto' })
  @IsNotEmpty({ message: 'El celular es obligatorio' })
  @Matches(/^[+\d][\d\s\-()]{6,19}$/, {
    message: 'El celular debe ser un número válido',
  })
  cellphone: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El servicio de interés debe ser texto' })
  @IsNotEmpty({ message: 'El servicio de interés es obligatorio' })
  @MaxLength(255)
  subject: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'La descripción del caso debe ser texto' })
  @IsNotEmpty({ message: 'La descripción del caso es obligatoria' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @MaxLength(2000)
  message: string;
}
