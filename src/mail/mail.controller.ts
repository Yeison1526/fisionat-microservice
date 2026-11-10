import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactRequestDto } from './dto/contact-request.dto';
import { EmailResponseDto } from './dto/email-response.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('welcome')
  async handleContact(@Body() dto: ContactRequestDto): Promise<EmailResponseDto> {
    return this.mailService.handleContactRequest(dto);
  }
}