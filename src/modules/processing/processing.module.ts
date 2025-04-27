// src/modules/processing/processing.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProcessingProcessor } from './processing.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'processing',
    }),
  ],
  providers: [ProcessingProcessor],
})
export class ProcessingModule {}
