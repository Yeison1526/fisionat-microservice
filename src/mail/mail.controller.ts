import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ContactRequestDto } from './dto/contact-request.dto';
import { EmailResponseDto } from './dto/email-response.dto';
import { MailService } from './mail.service';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('welcome')
  @ApiOperation({
    summary: 'Registrar solicitud de contacto',
    description:
      'Recibe una solicitud de contacto, envía un correo de confirmación al cliente y una notificación al fisioterapeuta.',
  })
  @ApiBody({ type: ContactRequestDto })
  @ApiOkResponse({
    description: 'Solicitud procesada correctamente.',
    type: EmailResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos o faltantes.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'El proveedor de correo rechazó el envío.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno o configuración incompleta del servidor.',
  })
  async handleContact(@Body() dto: ContactRequestDto): Promise<EmailResponseDto> {
    return this.mailService.handleContactRequest(dto);
  }
}