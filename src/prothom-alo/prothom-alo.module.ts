import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestCrawlerModule } from 'nest-crawler';
import { NewsCrawlerEntity } from './news-entity';
import { ProthomAloController } from './prothom-alo.controller';
import { ProthomAloService } from './prothom-alo.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCrawlerEntity,
      // LeadInfoRepository,
    ]),
    NestCrawlerModule,
  ],
  controllers: [ProthomAloController],
  providers: [ProthomAloService],
  exports: [ProthomAloService],
})
export class ProthomAloModule {}
