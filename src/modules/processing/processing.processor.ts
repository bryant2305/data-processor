// src/modules/processing/processing.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('processing')
export class ProcessingProcessor {
  @Process('process-record')
  async handleRecord(job: Job<any>) {
    const record = job.data;

    console.log('Processing record:', record);

    // Simulamos procesamiento
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
