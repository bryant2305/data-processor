export interface FileProcessor {
  process(filePath: string): Promise<any[]>;
}
