import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('public')
export class PublicController {
  @Get('/health-check')
  @HttpCode(HttpStatus.NO_CONTENT)
  healthCheck(): void {
    // Nothing to do => return HttpStatus.NO_CONTENT
  }
}
