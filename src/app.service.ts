import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Request } from 'express';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { ClickInfo } from './interfaces';

const LINK_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async shorten(url: string) {
    let code;
    let exists = true;
    let attempts = 0;
    try {
      while (exists && attempts < 5) {
        code = randomBytes(4).toString('base64url');
        exists = (await this.redis.exists(`short:${code}`)) > 0;
        attempts++;
      }
      if (exists)
        throw new InternalServerErrorException(
          'Could not generate unique code',
        );
      await this.redis.set(`short:${code}`, url, 'EX', LINK_TTL_SECONDS);
      await this.redis.del(`info:${code}`);
      await this.redis.expire(`info:${code}`, LINK_TTL_SECONDS);
      return { short: `http://do.co/${code}` };
    } catch {
      throw new InternalServerErrorException('Redis unavailable');
    }
  }

  async getUrl(code: string, req: Request) {
    const url = await this.redis.get(`short:${code}`);

    if (!url) {
      throw new NotFoundException('Short link not found');
    }

    const ua =
      typeof req.headers['user-agent'] === 'string'
        ? req.headers['user-agent']
        : '';
    const ip = typeof req.ip === 'string' ? req.ip : 'unknown';
    const click: ClickInfo = { ip, ua, ts: Date.now() };
    await this.redis.rpush(`info:${code}`, JSON.stringify(click));
    await this.redis.expire(`info:${code}`, LINK_TTL_SECONDS);

    return url;
  }

  async getInfo(code: string): Promise<ClickInfo[]> {
    try {
      const items = await this.redis.lrange(`info:${code}`, 0, -1);
      return items.map((i) => JSON.parse(i) as ClickInfo);
    } catch {
      throw new InternalServerErrorException('Redis unavailable');
    }
  }
}
