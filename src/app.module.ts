import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestCrawlerModule } from 'nest-crawler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerModule } from './crawler/crawler.module';
import { IttefaqController } from './ittefaq/ittefaq.controller';
import { IttefaqService } from './ittefaq/itterfaq.service';
import { NewsLinkEntity } from './news-crawler/news-link-entity';
import { NewsLinkController } from './news-crawler/news-link.controller';
import { NewsLinkService } from './news-crawler/news-link.service';
import { NewsCrawlerEntity } from './prothom-alo/news-entity';
import { ProthomAloModule } from './prothom-alo/prothom-alo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: `postgres`,
      password: `123456`,
      database: `test_db`,
      entities: [NewsCrawlerEntity, NewsLinkEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([NewsLinkEntity]),
    NestCrawlerModule,
    CrawlerModule,
    ProthomAloModule,
  ],
  controllers: [AppController, IttefaqController, NewsLinkController],
  providers: [AppService, IttefaqService, NewsLinkService],
})
export class AppModule {}
