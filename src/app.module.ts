import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { dbConfig } from './system/database/connection';
import { ClientIdMiddleware } from './system/middlewares/client-id.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIdMiddleware).forRoutes('user');
  }
}
