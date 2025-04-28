import { Injectable } from '@nestjs/common';
import { QueueManager } from '../../../interfaces/queue-manager.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { RecordData } from 'src/modules/interfaces/record-data.interface';

@Injectable()
export class ProcessingQueueManager implements QueueManager {
  constructor(@InjectQueue('processing') private readonly queue: Queue) {}

  async addRecords(records: RecordData[]): Promise<void> {
    await this.queue.addBulk(
      records.map((record) => ({
        name: 'process-record',
        data: record,
      })),
    );
  }
}
