import { Test } from '@nestjs/testing'
import { PetService } from './pet.service'
import { PrismaService } from '../../prisma/services/prisma.service'
import { OrgService } from '../../org/services/org.service'
import { petRepositoryMock } from '../../../testing/pet-repository.mock'
import { PetEntity } from '../entities/pet.entity'
import { Size } from '../enums/size.enum'
import { UniqueIdentity } from '../../core/entities/value-objects/unique-identity'

describe('PetService', () => {
  let petService: PetService
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PetService, PrismaService, OrgService],
    })
      .overrideProvider(PrismaService)
      .useValue(petRepositoryMock)
      .overrideProvider(OrgService)
      .useValue({
        findById: jest.fn().mockResolvedValue({
          id: '5cf05b54-432e-46cd-93ed-7b7c019c4847',
          city: 'Osasco 6',
          email: 'osasco6@email.com',
          phone: '1199545',
          role: 1,
        }),
      })
      .compile()

    petService = module.get(PetService)
  })

  test('should create a Pet', async () => {
    const pet = PetEntity.create({
      name: 'Bolt',
      description: 'cachorro danado',
      age: 7,
      size: Size.Small,
      orgId: new UniqueIdentity('5cf05b54-432e-46cd-93ed-7b7c019c4847'),
    })
    const result = await petService.create(pet)
    expect(result.orgId).toBe(pet.orgId.value)
  })

  test('should list all pets by city', async () => {
    const results = await petService.list('Osasco')
    expect(results[0].orgId).toBe('5cf05b54-432e-46cd-93ed-7b7c019c4847')
  })

  test('should show a pets', async () => {
    const results = await petService.show(
      '1fb73f97-3101-44b9-a55c-ea23b95ccb86',
    )
    expect(results.orgId).toBe('5cf05b54-432e-46cd-93ed-7b7c019c4847')
  })
})
