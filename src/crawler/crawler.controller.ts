import { Controller } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

//swagger doc
// @ApiTags('Admin|Dynamic Lead')
// @ApiBearerAuth('jwt')
@Controller({
  //path name
  path: 'crawler',
  //version
  version: '1',
})
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}
}
