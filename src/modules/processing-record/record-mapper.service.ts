import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordMapper {
  toEntity(raw: any): Record {
    const record = new Record();
    record.file_name = raw.fileName || null;
    record.data = raw;
    return record;
  }
}
