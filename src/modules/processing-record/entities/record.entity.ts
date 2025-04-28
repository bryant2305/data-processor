import { RecordData } from 'src/modules/interfaces/record-data.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('records')
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  file_name: string;

  @Column({ type: 'jsonb', nullable: true })
  data: RecordData;

  @CreateDateColumn()
  created_at: Date;
}
