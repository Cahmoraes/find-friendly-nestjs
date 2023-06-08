import { Global, Module } from '@nestjs/common'
import { SessionController } from './controllers/session.controller'
import { OrgModule } from '../org/org.module'
import { SessionService } from './services/session.service'

@Global()
@Module({
  imports: [OrgModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [],
})
export class SessionModule {}
