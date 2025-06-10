import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response, Request } from 'express';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  it('shortens a url', async () => {
    const result = await appController.shorten({ url: 'http://example.com' });
    expect(result.short).toMatch(/^http:\/\/do\.co\/.+/);
  });

  it('redirects to original url and tracks click', async () => {
    const { short } = await appController.shorten({
      url: 'http://example.com',
    });
    const code = short.split('/').pop()!;
    const req = {
      ip: '1.2.3.4',
      headers: { 'user-agent': 'jest' },
    } as unknown as Request;
    const redirectMock = jest.fn();
    const res = { redirect: redirectMock } as unknown as Response;
    await appController.redirect({ code }, res, req);
    expect(redirectMock).toHaveBeenCalledWith({ url: 'http://example.com' });
    const info = await appController.info({ code });
    expect(info.length).toBe(1);
    expect(info[0].ip).toBe('1.2.3.4');
    expect(info[0].ua).toBe('jest');
  });

  it('returns info for a code', async () => {
    const { short } = await appController.shorten({
      url: 'http://example.com',
    });
    const code = short.split('/').pop()!;
    const info = await appController.info({ code });
    expect(Array.isArray(info)).toBe(true);
  });
});
