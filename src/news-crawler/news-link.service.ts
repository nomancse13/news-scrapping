import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusField } from 'src/common/enum/statusField.enum';
import { Repository } from 'typeorm';
import { CreateNewsLinkDto } from './dto/create-news-link.dto';
import { UpdateNewsLinkDto } from './dto/update-news-link.dto';
import { NewsLinkEntity } from './news-link-entity';

@Injectable()
export class NewsLinkService {
  constructor(
    @InjectRepository(NewsLinkEntity)
    private linkRepository: Repository<NewsLinkEntity>,
  ) {}

  // CREATE A NEWS LINK
  async createNewsLink(createNewsLinkDto: CreateNewsLinkDto) {
    if (createNewsLinkDto.newsLink) {
      const tyepFormat = createNewsLinkDto.newsLink.split('.');
      createNewsLinkDto['type'] = tyepFormat[1];
    }

    const linkData = await this.linkRepository.save(createNewsLinkDto);
    return linkData;
  }

  // UPDATE A NEWS LINK
  async updateNewsLink(id: number, updateNewsLinkDto: UpdateNewsLinkDto) {
    if (updateNewsLinkDto.newsLink) {
      const tyepFormat = updateNewsLinkDto.newsLink.split('.');
      updateNewsLinkDto['type'] = tyepFormat[1];
    }

    const linkUpdateData = await this.linkRepository
      .createQueryBuilder()
      .update(NewsLinkEntity, updateNewsLinkDto)
      .where('id = :id', { id: id })
      .returning('*')
      .execute();
    return linkUpdateData.raw[0];
  }

  async getOneLink(id: number) {
    const singleLink = await this.linkRepository
      .createQueryBuilder('link')
      .where('link.id = :id', {
        id: id,
      })
      .getOne();
    if (!singleLink) {
      throw new NotFoundException(`link not found!`);
    }
    return singleLink;
  }

  async getAllLink() {
    const allLink = await this.linkRepository
      .createQueryBuilder('link')
      .where(`link.status='${StatusField.ACTIVE}'`)
      .getMany();
    if (!allLink) {
      throw new NotFoundException(`link not found!`);
    }
    return allLink;
  }
}
