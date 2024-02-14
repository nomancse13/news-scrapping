import { Controller, Get, Param } from '@nestjs/common';
import { ProthomAloService } from './prothom-alo.service';

@Controller({ path: 'news' })
export class ProthomAloController {
  constructor(private readonly prothomAloService: ProthomAloService) {}

  @Get('/collect/:date')
  // date format should be "2022-08-17"
  async getLink(@Param('date') date: string) {
    const link = await this.prothomAloService.scrapeLink(date);
    return this.prothomAloService.scrapeInfo(link);
  }

  // @Post('/info')
  // async getInfo() {
  //   return this.prothomAloService.scrapeInfo();
  // }
}
