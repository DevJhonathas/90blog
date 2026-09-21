import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { NeocitiesService } from './neocities.service.js';

@Controller('api')
export class NeocitiesController {
  constructor(private readonly neocitiesService: NeocitiesService) {}

  @Get('neocities-info')
  async getInfo(@Res() res: Response) {
    try {
      const result = await this.neocitiesService.getInfo();

      return res.status(result.status).json(result.data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: message,
      });
    }
  }
}
