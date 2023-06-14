import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/services/prisma.service'
import { OrgService } from '../../org/services/org.service'
import { PetEntity } from '../entities/pet.entity'

@Injectable()
export class PetService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orgService: OrgService,
  ) {}

  public async list(query: string) {
    return this.prismaService.pet.findMany({
      where: {
        org: {
          city: {
            contains: query,
          },
        },
      },
    })
  }

  public async create(aPet: PetEntity) {
    await this.orgService.findByIdOrThrow(aPet.orgId.value)

    return this.prismaService.pet.create({
      data: {
        age: aPet.age,
        name: aPet.name,
        description: aPet.description,
        size: aPet.size,
        createdAt: aPet.createdAt,
        org: {
          connect: {
            id: aPet.orgId.value,
          },
        },
      },
    })
  }

  public async show(aId: string) {
    const pet = await this.prismaService.pet.findUnique({
      where: {
        id: aId,
      },
    })
    if (!pet) throw new BadRequestException('Pet not found')
    return pet
  }
}
