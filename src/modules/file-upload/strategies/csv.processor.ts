import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { FileProcessor } from '../../interfaces/file-processor.interface';
import { RecordData } from 'src/modules/interfaces/record-data.interface';

@Injectable()
export class CsvProcessor implements FileProcessor {
  async process(filePath: string): Promise<RecordData[]> {
    return new Promise((resolve, reject) => {
      const records = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => records.push(data))
        .on('end', () => {
          if (records.length === 0) {
            reject(new Error('CSV file is empty.'));
          }
          resolve(records);
        })
        .on('error', (err) => reject(err));
    });
  }
}
