import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { RecordData } from '../interfaces/record-data.interface';

@Injectable()
export class RecordMapper {
  toEntity(raw: RecordData): Record {
    const record = new Record();
    record.file_name = raw.fileName || null;
    record.data = raw;
    return record;
  }
}
