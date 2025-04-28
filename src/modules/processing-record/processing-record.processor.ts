import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Record } from './entities/record.entity';
import { RecordMapper } from './record-mapper.service';

@Processor('processing')
export class ProcessingProcessor {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly recordMapper: RecordMapper,
  ) {}

  @Process('process-record')
  async handleRecord(job: Job<any>) {
    const rawRecord = job.data;

    try {
      const record = this.recordMapper.toEntity(rawRecord);

      await this.recordRepository.save(record);
    } catch (error) {
      console.error('Error saving record:', error.message);
    }
  }
}
