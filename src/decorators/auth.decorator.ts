import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard, RolesGuard))
}
