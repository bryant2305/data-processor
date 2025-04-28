import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entities/record.entity';
import { RecordData } from '../interfaces/record-data.interface';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  async saveRecord(recordData: RecordData, fileName?: string): Promise<Record> {
    const record = this.recordRepository.create({
      file_name: fileName,
      data: recordData,
    });
    return this.recordRepository.save(record);
  }
}
