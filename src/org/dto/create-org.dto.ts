import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator'
import { Role } from '../../core/enums/role.enum'

export class CreateOrgDTO {
  @IsEmail()
  email: string

  @IsStrongPassword({
    minLength: 5,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string

  @IsString()
  @MinLength(5)
  phone: string

  @IsString()
  city: string

  @IsOptional()
  @IsEnum(Role)
  role = 1
}
