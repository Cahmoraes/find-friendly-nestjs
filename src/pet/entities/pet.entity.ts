import { Optional } from '../../core/@types/optional'
import { Entity } from '../../core/entities/entity'
import { UniqueIdentity } from '../../core/entities/value-objects/unique-identity'
import { Size } from '../enums/size.enum'

interface PetProps {
  orgId: UniqueIdentity
  name: string
  description: string
  age: number
  size: Size
  createdAt: Date
}

export class PetEntity extends Entity<PetProps> {
  static create(props: Optional<PetProps, 'createdAt'>, id?: UniqueIdentity) {
    return new PetEntity(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
  }

  get orgId(): UniqueIdentity {
    return this.props.orgId
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get age(): number {
    return this.props.age
  }

  get size(): Size {
    return this.props.size
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
