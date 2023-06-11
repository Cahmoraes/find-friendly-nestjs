import { Injectable } from '@nestjs/common'
import { OrgService } from '../../org/services/org.service'
import { AuthService } from '../../auth/services/auth.service'
import { CredentialDTO } from '../dto/credential.dto'

@Injectable()
export class SessionService {
  constructor(
    private readonly authService: AuthService,
    private readonly orgService: OrgService,
  ) {}

  public async create(credential: CredentialDTO): Promise<string> {
    const org = await this.orgService.findByEmail(credential.email)
    return this.authService.login(org, credential.password)
  }
}
