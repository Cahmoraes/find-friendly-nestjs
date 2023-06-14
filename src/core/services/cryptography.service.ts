import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptographyService {
  public async encrypt(aPlainText: string): Promise<string> {
    return bcrypt.hash(aPlainText, await this.salt())
  }

  private async salt(): Promise<string> {
    return bcrypt.genSalt()
  }

  public compare(aTarget: string, aHash: string): Promise<boolean> {
    return bcrypt.compare(aTarget, aHash)
  }
}
