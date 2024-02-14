import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNewsLinkDto } from './dto/create-news-link.dto';
import { UpdateNewsLinkDto } from './dto/update-news-link.dto';
import { NewsLinkService } from './news-link.service';

@Controller({ path: 'news-link' })
export class NewsLinkController {
  constructor(private readonly newsLinkService: NewsLinkService) {}

  // create news link
  @Post('insertData')
  async create(@Body() createNewsLinkDto: CreateNewsLinkDto) {
    const data = await this.newsLinkService.createNewsLink(createNewsLinkDto);
    return { message: 'Successful', result: data };
  }

  // update news link
  @Patch('updateData/:id')
  async update(
    @Param('id') id: number,
    @Body() updateNewsLinkDto: UpdateNewsLinkDto,
  ) {
    const data = await this.newsLinkService.updateNewsLink(
      id,
      updateNewsLinkDto,
    );
    return { message: 'Successful', result: data };
  }

  // get single link
  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.newsLinkService.getOneLink(id);
    return { message: 'Successful', result: data };
  }

  // get all link
  @Get()
  async getAll() {
    const data = await this.newsLinkService.getAllLink();
    return { message: 'Successful', result: data };
  }

  // @Post('/info')
  // async getInfo() {
  //   return this.prothomAloService.scrapeInfo();
  // }
}
