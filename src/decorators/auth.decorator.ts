import { UseGuards, applyDecorators } from '@nestjs/common'
import { Role } from '../core/enums/role.enum'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard, RolesGuard))
}
