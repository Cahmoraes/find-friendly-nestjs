import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { PetModule } from './pet/pet.module'
import { OrgModule } from './org/org.module'
import { AuthModule } from './auth/auth.module'
import { SessionModule } from './session/session.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [
    CoreModule,
    PrismaModule,
    AuthModule,
    PetModule,
    OrgModule,
    SessionModule,
  ],
})
export class AppModule {}
