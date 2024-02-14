import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('newsCrawler')
export class NewsCrawlerEntity {
  @PrimaryGeneratedColumn({
    type: 'int8',
    comment: 'Primary id for the table',
  })
  id: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  summary: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'text', nullable: true })
  info: number;

  @Column({ type: 'text', nullable: true })
  tags: number;

  @Column({ type: 'text', nullable: true })
  featureImageSrc: string;

  @Column({ type: 'text', nullable: true })
  metaTitle: string;

  @Column({ type: 'text', nullable: true })
  content: string;
}
