import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthService } from '../auth/services/auth.service'
import { Request } from 'express'
import { OrgService } from '../org/services/org.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly orgService: OrgService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const tokenPayload = this.authService.verify(this.token(request))
    const org = await this.orgService.findById(tokenPayload.sub)
    request.org = org
    request.tokenPayload = tokenPayload
    return true
  }

  private token(aRequest: Request): string {
    return String(aRequest.headers.authorization).split(' ')[1]
  }
}
