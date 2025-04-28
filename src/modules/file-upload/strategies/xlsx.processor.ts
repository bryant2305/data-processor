import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { FileProcessor } from '../../interfaces/file-processor.interface';
import { RecordData } from 'src/modules/interfaces/record-data.interface';


@Injectable()
export class XlsxProcessor implements FileProcessor {
  async process(filePath: string): Promise<RecordData[]> {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const records = XLSX.utils.sheet_to_json<RecordData>(sheet);

    if (records.length === 0) {
      throw new Error('XLSX file is empty.');
    }

    return records;
  }
}
