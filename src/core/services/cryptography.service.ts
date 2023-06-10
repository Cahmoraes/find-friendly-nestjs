import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptographyService {
  public async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, await this.salt())
  }

  private async salt(): Promise<string> {
    return bcrypt.genSalt()
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
