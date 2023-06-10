import { Test, TestingModule } from '@nestjs/testing'
import { OrgService } from './org.service'
import { PrismaService } from '../../prisma/services/prisma.service'
import { orgRepositoryMock } from '../../../testing/org-repository.mock'
import { OrgEntity } from '../entities/org.entity'
import { BadRequestException } from '@nestjs/common'

describe('OrgService', () => {
  let orgService: OrgService
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(orgRepositoryMock)
      .compile()

    prismaService = module.get(PrismaService)
    orgService = module.get<OrgService>(OrgService)
  })

  test('create', async () => {
    const org = OrgEntity.create({
      city: 'Osasco',
      email: 'test@example.com',
      password: '123456',
      phone: '11456456',
      role: 1,
    })

    const result = await orgService.create(org)
    expect(result).toMatchObject({
      city: 'Osasco',
    })
  })

  test('list', async () => {
    const result = await orgService.list()
    expect(result[0]).toMatchObject({
      city: 'Osasco 1',
    })
  })

  test('findByEmail', async () => {
    const result = await orgService.findByEmail('test@example.com')
    expect(result).toMatchObject({
      city: 'Osasco 1',
    })
  })

  test('deve lançar uma exceção caso usuário não exista', async () => {
    jest.spyOn(prismaService.org, 'findUnique').mockResolvedValueOnce(null)
    await expect(() =>
      orgService.findByEmail('nothing'),
    ).rejects.toBeInstanceOf(BadRequestException)

    jest.resetAllMocks()
  })
})
