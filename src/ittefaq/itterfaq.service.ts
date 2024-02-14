import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';

@Injectable()
export class IttefaqService {
  constructor(private readonly crawler: NestCrawlerService) {}

  // scraping all page link of a day
  public async scrapeLink(): Promise<any> {
    const data: any = await this.crawler.fetch({
      target: `https://www.ittefaq.com.bd/news-sitemap.xml`,
      fetch: {
        content: {
          selector: 'url',
        },
      },
    });

    const link = data.content.split('\n');

    const pages = [];
    const chunkSize = 8;
    for (let i = 0; i < link.length; i += chunkSize) {
      for (let j = 0; j < 1; j++) {
        pages.push(link[i]);
      }
    }

    const arr = pages;
    const result = arr.filter((e) => e);
    return result;
  }

  // scrapping information of a page
}
