import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProcessingProcessor } from './processing-record.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { RecordMapper } from './record-mapper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    BullModule.registerQueue({
      name: 'processing',
    }),
  ],
  providers: [ProcessingProcessor, RecordMapper],
})
export class ProcessingModule {}
