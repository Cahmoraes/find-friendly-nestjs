import { Module, Global } from '@nestjs/common'
import { CryptographyService } from './services/cryptography.service'

@Global()
@Module({
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CoreModule {}
