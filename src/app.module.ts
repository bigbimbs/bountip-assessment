import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ThrottlerModule } from '@nestjs/throttler';
import { config } from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config();

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ limit: 20, ttl: 60 }],
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        options: {
          password: process.env.REDIS_PASSWORD,
          username: process.env.REDIS_USERNAME,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
