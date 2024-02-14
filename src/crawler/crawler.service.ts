import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';

@Injectable()
export class CrawlerService {
  constructor(private readonly crawler: NestCrawlerService) {}

  // scraping the specific page
  public async scrape(): Promise<any> {
    interface ExampleCom {
      title: string;
      meta: string;
      imageSrc: string;
      content: string;
      tags: any;
      catagroyes: any;
      info: any;
    }

    // ---------For Aljazeera----------

    //   const data: ExampleCom = await this.crawler.fetch({
    //     target:
    //       'https://www.aljazeera.com/news/2020/11/2/at-least-50000-take-part-in-anti-france-rally-in-bangladesh',
    //     fetch: {
    //       title: 'h1',
    //       meta: 'p.article__subhead.css-1wt8oh6',
    //       imageSrc: {
    //         selector: 'div.responsive-image > img',
    //         attr: 'src',
    //       },
    //       // info: {
    //       //   selector: 'h6',
    //       //   //   attr: 'p',
    //       // },
    //       content: {
    //         selector: 'div.wysiwyg.wysiwyg--all-content.css-ibbk12',
    //         //   how: 'html',
    //       },
    //       tags: {
    //         selector: 'div.breadcrumbs',
    //       },
    //     },
    //   });

    //   return {
    //     title: data.title,
    //     metaTitle: data.meta,
    //     imageSrc: 'https://www.aljazeera.com' + data.imageSrc,
    //     content: data.content,
    //     tag: data.tags,
    //   };
    //   // {
    //   //   title: 'Example Domain',
    //   //   info: 'http://www.iana.org/domains/example',
    //   //   content: '<div><h1>Example Heading</h1><p>Example Paragraph</p></div>'
    //   // }
    // }

    // for Prothom alo

    // const data: ExampleCom = await this.crawler.fetch({
    //   target: 'https://www.prothomalo.com/chakri/chakri-news/0iecfd4kec',
    //   fetch: {
    //     title: 'h1',
    //     meta: 'p.article__subhead.css-1wt8oh6',
    //     imageSrc: {
    //       selector: 'div > figure > img',
    //       attr: 'src',
    //     },
    //     info: {
    //       selector: 'div.story-element.story-element-image',
    //       // attr: 'src',
    //     },
    //     content: {
    //       selector: 'div.story-element.story-element-text',
    //       //   how: 'html',
    //     },
    //     tags: {
    //       selector:
    //         'div.print-entity-section-wrapper.storytitleInfo-m__entity-section-wrapper__V4NiL',
    //     },
    //   },
    // });

    // return {
    //   title: data.title,
    //   metaTitle: data.meta,
    //   imageSrc: data.imageSrc,
    //   content: data.content,
    //   info: data.info,
    //   tag: data.tags,
    // };
    // {
    //   title: 'Example Domain',
    //   info: 'http://www.iana.org/domains/example',
    //   content: '<div><h1>Example Heading</h1><p>Example Paragraph</p></div>'
    // }

    //  for bdnews24

    //prothomalo.com/sitemap/sitemap-daily-2022-08-06.xml

    const data: ExampleCom = await this.crawler.fetch({
      target: 'https://www.prothomalo.com/sitemap/sitemap-daily-2022-08-17.xml',
      fetch: {
        content: {
          selector: 'url',
          // how: 'html',
        },
        title: 'h2.MbPT-',
        meta: 'h3.U9-xA',
        imageSrc: {
          selector: 'img',
          attr: 'data-src',
          // how: 'html',
        },
        // info: {
        //   selector: 'div.story-element.story-element-image > img',
        //   attr: 'data-src',
        // },
        // content: {
        //   selector: 'urlset ',
        //   how: 'html',
        // },
        tags: {
          selector: 'div.breadcrumb-wrapper.bGxZT',
          // how: 'raw',
          // attr: 'href',
          // eq: 1,
        },
      },
    });

    // return data;

    // const fileContents = new Buffer(data.imageSrc, 'base64');
    // fs.writeFile(part.filename, fileContents, (err) => {
    //   if (err) return console.error(err);
    //   console.log('file saved to ', part.filename);
    // });
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
    console.log(result.length);

    const arrr = [];
    // let prothomaloData: ExampleCom;
    for (let i = 0; i < result.length; i++) {
      console.log(result[i], '====');

      const prothomaloData: ExampleCom = await this.crawler.fetch({
        target: `${result[i]}`,
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
          content: {
            selector: 'div.story-element.story-element-text',
            //   how: 'html',
          },
          tags: {
            selector:
              'div.print-entity-section-wrapper.storytitleInfo-m__entity-section-wrapper__V4NiL',
          },
        },
      });

      arrr.push({
        title: prothomaloData.title,
        metaTitle: prothomaloData.meta,
        // imageSrc: prothomaloData.imageSrc,
        content: prothomaloData.content,
        // contentLength: data.content.length,
        // info: data.info,
        tag: prothomaloData.tags,
        // pages: pages,
        // length: link.length,
        // result: result,
      });
    }
    return arrr;

    // return {
    //   title: data.title,
    //   metaTitle: data.meta,
    //   imageSrc: data.imageSrc,
    //   content: data.content.split('\n'),
    //   contentLength: data.content.length,
    //   info: data.info,
    //   tag: data.tags,
    //   // pages: pages,
    //   // length: link.length,
    //   result: result,
    // };
  }

  // crawling multi pages is also supported
  public async crawl(): Promise<void> {
    interface HackerNewsPage {
      title: string;
    }

    const pages: HackerNewsPage[] = await this.crawler.fetch({
      target: {
        url: 'https://news.ycombinator.com',
        iterator: {
          selector: 'span.age > a',
          convert: (x: string) => `https://news.ycombinator.com/${x}`,
        },
      },
      fetch: (data: any, index: number, url: string) => ({
        title: '.title > a',
      }),
    });

    console.log(pages);
    // [
    //   { title: 'Post Title 1' },
    //   { title: 'Post Title 2' },
    //   ...
    //   ...
    //   { title: 'Post Title 30' }
    // ]
  }
}
