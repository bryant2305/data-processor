import { Injectable, BadRequestException } from '@nestjs/common';
import { FileProcessor } from '../interfaces/file-processor.interface';
import { CsvProcessor } from '../file-upload/strategies/csv.processor';
import { XlsxProcessor } from '../file-upload/strategies/xlsx.processor';
import { FileCleaner } from './strategies/file-cleaner/file-cleaner.service';
import { NotificationService } from '../notification/notification.service';
import { ProcessingQueueManager } from './strategies/queue-records/records-queue.service';

@Injectable()
export class FileUploadService {
  private processors: Map<string, FileProcessor> = new Map();

  constructor(
    private readonly processingQueue: ProcessingQueueManager,
    private readonly notificationService: NotificationService,
    private readonly cleanupFile: FileCleaner,
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
      this.cleanupFile.cleanup(filePath);
      throw new BadRequestException('Unsupported file format.');
    }

    try {
      const records = await processor.process(filePath);
      await this.processingQueue.addRecords(records);
      this.notificationService.notifyProcessingFinished({
        message: 'Processing finished',
        recordsProcessed: records.length,
        timestamp: new Date(),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    } finally {
      this.cleanupFile.cleanup(filePath);
    }
  }
}
