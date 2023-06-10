import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../core/enums/role.enum'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { OrgACL } from '../core/acls/org.acl'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    const { org } = context.switchToHttp().getRequest()
    const orgEntity = OrgACL.toEntity(org)
    const rolesFiltered = requiredRoles.filter(
      (role) => role === orgEntity.role,
    )
    console.log(rolesFiltered)
    return rolesFiltered.length > 0
  }
}
