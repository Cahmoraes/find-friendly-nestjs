import { randomUUID } from 'node:crypto'

export class UniqueIdentity {
  private readonly _value: string

  constructor(id?: string) {
    this._value = id ?? randomUUID()
  }

  public get value() {
    return this._value
  }

  public equals(other: UniqueIdentity) {
    return this._value === other._value
  }
}
