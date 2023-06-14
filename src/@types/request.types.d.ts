import 'express-serve-static-core'
import { OrgEntity } from '../org/entities/org.entity'

export interface TokenPayload {
  sub: string
  email: string
  role: number
  iat: number
  exp: number
}

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload?: TokenPayload
    org?: OrgEntity
  }
}
