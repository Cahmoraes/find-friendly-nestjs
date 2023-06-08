import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common'
import { Schema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    try {
      console.log(value)
      this.schema.parse(value)
      return value
    } catch {
      throw new BadRequestException('Validation failed')
    }
  }
}
