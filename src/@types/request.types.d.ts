import 'express-serve-static-core'
import { OrgEntity } from '../org/entities/org.entity'

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload?: string
    org?: OrgEntity
  }
}
