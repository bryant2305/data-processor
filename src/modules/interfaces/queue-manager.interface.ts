export interface QueueManager {
  addRecords(records: any[]): Promise<void>;
}
