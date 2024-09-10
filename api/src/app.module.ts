import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RandomController } from './random/random.controller';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  controllers: [RandomController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
