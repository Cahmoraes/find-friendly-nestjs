import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OrgEntity } from '../../org/entities/org.entity'
import { CryptographyService } from '../../core/services/cryptography.service'
import { OrgService } from '../../org/services/org.service'
import { CredentialDTO } from '../../session/dto/credential.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cryptographyService: CryptographyService,
    private readonly orgService: OrgService,
  ) {}

  public verifyToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch {
      throw new UnauthorizedException()
    }
  }

  public async authenticate(credential: CredentialDTO): Promise<string> {
    const org = await this.orgService.findByEmailOrThrow(credential.email)
    const passwordsMatches = await this.cryptographyService.compare(
      credential.password,
      org.password,
    )
    if (!passwordsMatches) {
      throw new BadRequestException('Email or password mismatch')
    }
    return this.signToken(org)
  }

  private signToken(anOrgEntity: OrgEntity): string {
    return this.jwtService.sign(
      {
        sub: anOrgEntity.id.value,
        email: anOrgEntity.email,
        role: anOrgEntity.role,
      },
      {
        expiresIn: '7 days',
      },
    )
  }
}
