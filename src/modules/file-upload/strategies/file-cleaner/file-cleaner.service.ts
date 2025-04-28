import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileCleaner {
  cleanup(filePath: string) {
    fs.unlink(filePath, () => {});
  }
}
