import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import { GetUrlDto, ShortenDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('shorten')
  async shorten(@Body() body: ShortenDto) {
    return await this.appService.shorten(body.url);
  }

  @Get(':code')
  async redirect(
    @Param() params: GetUrlDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const url = await this.appService.getUrl(params.code, req);
    if (!url) throw new NotFoundException();
    res.redirect(url);
  }

  @Get('info/:code')
  async info(@Param() params: GetUrlDto) {
    return await this.appService.getInfo(params.code);
  }
}
