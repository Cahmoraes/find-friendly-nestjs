import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OrgEntity } from '../../org/entities/org.entity'
import { CryptographyService } from '../../core/services/cryptography.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cryptographyService: CryptographyService,
  ) {}

  public verify(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch {
      throw new UnauthorizedException()
    }
  }

  public async login(aOrg: OrgEntity, password: string): Promise<string> {
    const passwordsMatches = await this.cryptographyService.compare(
      password,
      aOrg.password,
    )
    if (!passwordsMatches) {
      throw new BadRequestException('Email or password mismatch')
    }
    return this.sign(aOrg)
  }

  private sign(anOrgEntity: OrgEntity): string {
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
