import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CrawlerService } from './crawler/crawler.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly crawlerService: CrawlerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/test')
  async getCrawl() {
    return this.crawlerService.scrape();
  }
}
