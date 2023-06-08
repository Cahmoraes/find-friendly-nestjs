import { JwtModule } from '@nestjs/jwt'
import { Global, Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { OrgModule } from '../org/org.module'
import { CryptographyService } from './services/cryptography.service'

@Global()
@Module({
  imports: [
    OrgModule,
    JwtModule.register({
      global: true,
      secret: '546as65as2131546asd56as',
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  providers: [AuthService, CryptographyService],
  exports: [AuthService, CryptographyService],
})
export class AuthModule {}
