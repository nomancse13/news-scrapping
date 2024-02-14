import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { StatusField } from 'src/common/enum/statusField.enum';

class Fetch {
  @IsNotEmpty()
  heading: string;

  @IsNotEmpty()
  selector: string;

  @IsOptional()
  attr: string;
}

export class CreateNewsLinkDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  newsLink: string;

  @IsNotEmpty()
  syncStartTime: string;

  @IsNotEmpty()
  syncEndTime: string;

  @IsOptional()
  isEveryday: number;

  @IsOptional()
  xmlLink: string;

  @IsNotEmpty()
  @Type(() => Fetch)
  fetch: Fetch[];

  @IsEnum(StatusField)
  @IsOptional()
  status: StatusField;
}
