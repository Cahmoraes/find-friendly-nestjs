import { JwtModule } from '@nestjs/jwt'
import { Global, Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { OrgModule } from '../org/org.module'

@Global()
@Module({
  imports: [
    OrgModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
