import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Nombre del contacto.',
    example: 'Ana',
    minLength: 2,
    maxLength: 100,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Apellidos del contacto.',
    example: 'Pérez Gómez',
    minLength: 2,
    maxLength: 100,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'Los apellidos deben ser texto' })
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({
    description: 'Correo electrónico del contacto.',
    example: 'ana.perez@example.com',
    format: 'email',
    maxLength: 254,
  })
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

  @ApiProperty({
    description: 'Número de celular o teléfono de contacto.',
    example: '+57 300 123 4567',
    pattern: '^[+\\d][\\d\\s\\-()]{6,19}$',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El celular debe ser texto' })
  @IsNotEmpty({ message: 'El celular es obligatorio' })
  @Matches(/^[+\d][\d\s\-()]{6,19}$/, {
    message: 'El celular debe ser un número válido',
  })
  cellphone: string;

  @ApiProperty({
    description: 'Servicio de interés o asunto de la solicitud.',
    example: 'Terapia física para dolor lumbar',
    maxLength: 255,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'El servicio de interés debe ser texto' })
  @IsNotEmpty({ message: 'El servicio de interés es obligatorio' })
  @MaxLength(255)
  subject: string;

  @ApiProperty({
    description: 'Descripción del caso o mensaje del contacto.',
    example: 'Tengo dolor en la zona lumbar desde hace dos semanas y quisiera agendar una valoración.',
    minLength: 5,
    maxLength: 2000,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString({ message: 'La descripción del caso debe ser texto' })
  @IsNotEmpty({ message: 'La descripción del caso es obligatoria' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @MaxLength(2000)
  message: string;
}
