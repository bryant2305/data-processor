// src/modules/file-upload/file-upload.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { CsvProcessor } from './strategies/csv.processor';
import { XlsxProcessor } from './strategies/xlsx.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'processing',
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService, CsvProcessor, XlsxProcessor],
})
export class FileUploadModule {}
