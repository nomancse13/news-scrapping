import { Controller, Get, Param } from '@nestjs/common';
import { IttefaqService } from './itterfaq.service';

@Controller({ path: 'ittefaq' })
export class IttefaqController {
  constructor(private readonly ittefaqService: IttefaqService) {}

  @Get('/link')
  // date format should be "2022-08-17"
  async getLink() {
    return this.ittefaqService.scrapeLink();
  }
}
