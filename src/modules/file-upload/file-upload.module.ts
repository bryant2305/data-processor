import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { CsvProcessor } from './strategies/csv.processor';
import { XlsxProcessor } from './strategies/xlsx.processor';
import { NotificationService } from '../notification/notification.service';
import { FileCleaner } from './strategies/file-cleaner/file-cleaner.service';
import { ProcessingQueueManager } from './strategies/queue-records/records-queue.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'processing',
    }),
  ],
  controllers: [FileUploadController],
  providers: [
    FileUploadService,
    CsvProcessor,
    XlsxProcessor,
    NotificationService,
    FileCleaner,
    ProcessingQueueManager,
    WebsocketGateway,
  ],
})
export class FileUploadModule {}
