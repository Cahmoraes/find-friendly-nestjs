import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthService } from '../auth/services/auth.service'
import { Request } from 'express'
import { OrgService } from '../org/services/org.service'
import { OrgEntity } from '../org/entities/org.entity'
import { TokenPayload } from '../@types/request.types'

@Injectable()
export class AuthGuard implements CanActivate {
  private TOKEN_POSITION_INDEX = 1
  constructor(
    private readonly authService: AuthService,
    private readonly orgService: OrgService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const tokenPayload = this.authService.verifyToken(this.tokenFor(request))
    const org = await this.orgService.findByIdOrThrow(tokenPayload.sub)
    this.mountRequest(request, org, tokenPayload)
    return true
  }

  private tokenFor(aRequest: Request): string {
    return String(aRequest.headers.authorization).split(' ')[
      this.TOKEN_POSITION_INDEX
    ]
  }

  private mountRequest(
    aRequest: Request,
    anOrg: OrgEntity,
    aTokenPayload: TokenPayload,
  ) {
    aRequest.org = anOrg
    aRequest.tokenPayload = aTokenPayload
  }
}
