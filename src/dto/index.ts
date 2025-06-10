import { IsString, IsUrl } from 'class-validator';

export class ShortenDto {
  @IsUrl({}, { message: 'Invalid URL' })
  url: string;
}

export class GetUrlDto {
  @IsString()
  code: string;
}
