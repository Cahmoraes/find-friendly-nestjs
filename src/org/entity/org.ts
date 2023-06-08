import { Optional } from '../../core/@types/optional'
import { Entity } from '../../core/entities/entity'
import { UniqueIdentity } from '../../core/entities/value-objects/unique-identity'

export interface OrgProps {
  email: string
  password: string
  phone: string
  city: string
  role: number
  createdAt: Date
}

export class OrgEntity extends Entity<OrgProps> {
  static create(
    props: Optional<OrgEntity, 'id' | 'createdAt'>,
    id?: UniqueIdentity,
  ) {
    return new OrgEntity(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get phone(): string {
    return this.props.phone
  }

  get city(): string {
    return this.props.city
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get role() {
    return this.props.role
  }
}
