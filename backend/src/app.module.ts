import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NeocitiesController } from './neocities.controller.js';
import { NeocitiesService } from './neocities.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [NeocitiesController],
  providers: [NeocitiesService],
})
export class AppModule {}
