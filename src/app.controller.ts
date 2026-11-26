import { Controller, Get, Header } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @Get('health')
  @Header('Cache-Control', 'no-store')
  @ApiOperation({ summary: 'Verificar que el servicio está activo' })
  @ApiOkResponse({ description: 'Servicio activo.' })
  health(): { status: string; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
