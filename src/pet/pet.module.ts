import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { PetController } from './controllers/pet.controller'
import { LoggerMiddleware } from '../middlewares/logger-middleware'

@Module({
  controllers: [PetController],
})
export class PetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'pets',
      method: RequestMethod.GET,
    })
  }
}
