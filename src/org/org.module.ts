import { Module } from '@nestjs/common'
import { OrgController } from './controllers/org.controller'
import { OrgService } from './services/org.service'

@Module({
  controllers: [OrgController],
  providers: [OrgService],
  exports: [OrgService],
})
export class OrgModule {}
