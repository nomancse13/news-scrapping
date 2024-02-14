import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { StatusField } from 'src/common/enum/statusField.enum';

export class UpdateNewsLinkDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  newsLink: string;

  @IsOptional()
  xmlLink: string;

  @IsNotEmpty()
  syncStartTime: string;

  @IsNotEmpty()
  syncEndTime: string;

  @IsOptional()
  isEveryday: number;

  @IsNotEmpty()
  fetch: any[];

  @IsEnum(StatusField)
  @IsOptional()
  status: StatusField;
}
