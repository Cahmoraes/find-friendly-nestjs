import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { PetController } from './controllers/pet.controller'
import { LoggerMiddleware } from '../middlewares/logger-middleware'
import { OrgModule } from '../org/org.module'
import { PetService } from './services/pet.service'

@Module({
  imports: [OrgModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'pets',
      method: RequestMethod.GET,
    })
  }
}
