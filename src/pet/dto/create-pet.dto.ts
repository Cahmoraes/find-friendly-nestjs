import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator'
import { Size } from '../enums/size.enum'

export class CreatePetDTO {
  @IsUUID()
  orgId: string

  @IsString()
  name: string

  @IsString()
  description: string

  @IsNumber()
  age: number

  @IsEnum(Size)
  size: Size
}
