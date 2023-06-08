import { UniqueIdentity } from './value-objects/unique-identity'

export abstract class Entity<Type> {
  private _id: UniqueIdentity

  protected constructor(protected readonly props: Type, id?: UniqueIdentity) {
    this._id = id ?? new UniqueIdentity()
  }

  get id(): UniqueIdentity {
    return this._id
  }
}
