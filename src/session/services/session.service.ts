import { Injectable } from '@nestjs/common'
import { AuthService } from '../../auth/services/auth.service'
import { CredentialDTO } from '../dto/credential.dto'

@Injectable()
export class SessionService {
  constructor(private readonly authService: AuthService) {}

  public async create(credential: CredentialDTO): Promise<string> {
    return this.authService.authenticate(credential)
  }
}
