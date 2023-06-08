import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { CreatePetDTO, createPetSchema } from '../dto/create-pet.dto'

@Controller('pets')
export class PetController {
  @Get()
  async get() {
    return [{ name: 'bolt' }]
  }

  @Get(':id')
  async getById(@Param('id', ZodValidationPipe) id: number) {
    return { id }
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createPetSchema))
  async create(@Body() createPetDTO: CreatePetDTO) {
    return { createPetDTO }
  }
}
