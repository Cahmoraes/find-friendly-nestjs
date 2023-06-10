import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { PetService } from '../services/pet.service'
import { AuthGuard } from '../../guards/auth.guard'
import { CreatePetDTO } from '../dto/create-pet.dto'
import { PetEntity } from '../entities/pet.entity'
import { UniqueIdentity } from '../../core/entities/value-objects/unique-identity'

@UseGuards(AuthGuard)
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  async create(@Body() createPetDTO: CreatePetDTO) {
    const pet = PetEntity.create({
      age: createPetDTO.age,
      description: createPetDTO.description,
      name: createPetDTO.name,
      orgId: new UniqueIdentity(createPetDTO.orgId),
      size: createPetDTO.size,
    })
    const petDTO = await this.petService.create(pet)
    return { pet: petDTO }
  }

  @Get()
  async list() {
    return this.petService.list('Osasco')
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.show(id)
  }
}
