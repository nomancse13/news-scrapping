import { StatusField } from 'src/common/enum/statusField.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('newsLink')
export class NewsLinkEntity {
  @PrimaryGeneratedColumn({
    type: 'int8',
    comment: 'Primary id for the table',
  })
  id: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  newsLink: string;

  @Column({ type: 'text', nullable: true })
  xmlLink: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'start time',
    nullable: true,
  })
  syncStartTime: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'end time',
    nullable: true,
  })
  syncEndTime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'json', nullable: true })
  fetch: any[];

  @Column({ type: 'int2', default: 0 })
  isEveryday: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Timestamp;

  // @Column({
  //   type: 'enum',
  //   enum: UserTypesEnum,
  //   default: UserTypesEnum.ADMIN,
  //   select: false,
  // })
  // createdType: string;

  // @Column({
  //   type: 'enum',
  //   enum: UserTypesEnum,
  //   nullable: true,
  //   select: false,
  // })
  // updatedType: string;

  @Column({ type: 'int', nullable: true, select: false })
  createdBy: number;

  @Column({ type: 'int', nullable: true, select: false })
  updatedBy: number;

  @Column({ type: 'int', nullable: true, select: false })
  deletedBy: number;

  @Column({
    type: 'enum',
    enum: StatusField,
    default: StatusField.ACTIVE,
  })
  status: string;
}
