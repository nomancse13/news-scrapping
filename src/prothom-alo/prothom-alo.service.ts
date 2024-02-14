import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NestCrawlerService } from 'nest-crawler';
import { Repository } from 'typeorm';
import { NewsCrawlerEntity } from './news-entity';

@Injectable()
export class ProthomAloService {
  constructor(
    @InjectRepository(NewsCrawlerEntity)
    private crawlerRepository: Repository<NewsCrawlerEntity>,
    private readonly crawler: NestCrawlerService,
  ) {}

  // scraping the specific page
  public async scrapeLink(date: string): Promise<any> {
    const data: any = await this.crawler.fetch({
      target: `https://www.prothomalo.com/sitemap/sitemap-daily-${date}.xml`,
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

  //   scrapping info from a single page

  public async scrapeInfo(link: any[]): Promise<any> {
    interface ProthomAlo {
      title: string;
      meta: string;
      imageSrc: string;
      content: string;
      tags: any;
      catagroyes: any;
      info: any;
    }

    const result = [];
    const tyepFormat = link.map((e) => {
      const format = e.split('.');
      return format[1];
    });
    for (let i = 0; i < link.length; i++) {
      const prothomaloData: ProthomAlo = await this.crawler.fetch({
        target: `${link[i]}`,
        fetch: {
          title: 'h1',
          meta: 'p.article__subhead.css-1wt8oh6',
          imageSrc: {
            selector: 'div > figure > img',
            attr: 'src',
          },
          info: {
            selector: 'div.story-element.story-element-image',
            // attr: 'src',
          },
          content: 'div.story-element.story-element-text',
          //  {
          //   selector: 'div.story-element.story-element-text',
          //   //   how: 'html',
          // },
          tags: {
            selector:
              'div.print-entity-section-wrapper.storytitleInfo-m__entity-section-wrapper__V4NiL',
          },
        },
      });
      result.push({
        title: prothomaloData.title,
        metaTitle: prothomaloData.meta,
        featureImageSrc: prothomaloData.imageSrc,
        content: prothomaloData.content,
        info: prothomaloData.info,
        tags: prothomaloData.tags,
        type: tyepFormat[i],
      });
    }

    // await this.crawlerRepository.insert(result);
    return result;
  }
}
