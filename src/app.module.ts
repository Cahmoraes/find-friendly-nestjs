import { Module } from '@nestjs/common'

import { PetModule } from './pet/pet.module'
import { PrismaModule } from './prisma/prisma.module'
import { OrgModule } from './org/org.module'
import { AuthModule } from './auth/auth.module'
import { SessionModule } from './session/session.module'

@Module({
  imports: [PrismaModule, AuthModule, PetModule, OrgModule, SessionModule],
})
export class AppModule {}
