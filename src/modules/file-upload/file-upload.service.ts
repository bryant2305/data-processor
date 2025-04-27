// src/modules/file-upload/file-upload.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FileProcessor } from '../interfaces/file-processor.interface';
import { CsvProcessor } from '../file-upload/strategies/csv.processor';
import { XlsxProcessor } from '../file-upload/strategies/xlsx.processor';

@Injectable()
export class FileUploadService {
  private processors: Map<string, FileProcessor> = new Map();

  constructor(
    @InjectQueue('processing') private readonly processingQueue: Queue,
    csvProcessor: CsvProcessor,
    xlsxProcessor: XlsxProcessor,
  ) {
    this.processors.set('csv', csvProcessor);
    this.processors.set('xlsx', xlsxProcessor);
  }

  async handleFile(filePath: string, originalName: string) {
    const extension = originalName.split('.').pop().toLowerCase();
    const processor = this.processors.get(extension);

    if (!processor) {
      this.cleanupFile(filePath);
      throw new BadRequestException('Unsupported file format.');
    }

    try {
      const records = await processor.process(filePath);
      await this.addRecordsToQueue(records);
    } catch (error) {
      throw new BadRequestException(error.message);
    } finally {
      this.cleanupFile(filePath);
    }
  }

  private async addRecordsToQueue(records: any[]) {
    for (const record of records) {
      await this.processingQueue.add('process-record', record);
    }
  }

  private cleanupFile(filePath: string) {
    fs.unlink(filePath, () => {});
  }
}
