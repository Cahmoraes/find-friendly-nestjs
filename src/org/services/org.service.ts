import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/services/prisma.service'
import { OrgEntity } from '../entities/org.entity'
import { Org } from '@prisma/client'
import { UniqueIdentity } from '../../core/entities/value-objects/unique-identity'

@Injectable()
export class OrgService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(anOrg: OrgEntity): Promise<OrgEntity> {
    const orgPrisma = await this.prismaService.org.create({
      data: {
        city: anOrg.city,
        email: anOrg.email,
        password_hash: anOrg.password,
        phone: anOrg.phone,
        role: anOrg.role,
        createdAt: anOrg.createdAt,
      },
    })

    return this.createOrg(orgPrisma)
  }

  public async list(): Promise<OrgEntity[]> {
    const orgsPrisma = await this.prismaService.org.findMany()
    return this.createOrgs(orgsPrisma)
  }

  private createOrgs(orgs: Org[]): OrgEntity[] {
    return orgs.map(this.createOrg)
  }

  private createOrg(anOrg: Org): OrgEntity {
    return OrgEntity.create(
      {
        city: anOrg.city,
        email: anOrg.email,
        password: anOrg.password_hash,
        phone: anOrg.phone,
        createdAt: anOrg.createdAt,
        role: anOrg.role,
      },
      new UniqueIdentity(anOrg.id),
    )
  }

  public async findByEmail(email: string) {
    const orgExisting = await this.prismaService.org.findUnique({
      where: {
        email,
      },
    })
    if (!orgExisting) {
      throw new BadRequestException('Email or password mismatch')
    }
    return this.createOrg(orgExisting)
  }

  public async findById(id: string): Promise<OrgEntity> {
    const prismaOrg = await this.prismaService.org.findUnique({
      where: {
        id,
      },
    })
    if (!prismaOrg) {
      throw new NotFoundException(`O usuário ${id} não existe.`)
    }
    return this.createOrg(prismaOrg)
  }
}
