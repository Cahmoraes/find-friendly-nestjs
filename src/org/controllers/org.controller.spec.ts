import { Test, TestingModule } from '@nestjs/testing'
import { OrgController } from './org.controller'
import { CryptographyService } from '../../core/services/cryptography.service'
import { OrgService } from '../services/org.service'
import { orgServiceMock } from '../../../testing/services/org.service.mock'
import { PrismaService } from '../../prisma/services/prisma.service'
import { orgEntityList } from '../../../testing/org-repository.mock'
import { OrgACL } from '../../core/acls/org.acl'
import { Auth } from '../../decorators/auth.decorator'
import { CreateOrgDTO } from '../dto/create-org.dto'

describe('OrgController', () => {
  let orgController: OrgController
  let orgService: OrgService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgController],
      providers: [CryptographyService, OrgService, PrismaService],
    })
      .useMocker(Auth)
      .overrideProvider(OrgService)
      .useValue(orgServiceMock)
      .compile()

    orgController = module.get(OrgController)
    orgService = module.get(OrgService)
  })

  test('Validar a definição', () => {
    expect(orgController).toBeDefined()
    expect(orgService).toBeDefined()
  })

  test('create', async () => {
    const orgDTO: CreateOrgDTO = {
      city: 'Osasco 1',
      email: 'test1@example.com',
      password: '1234561',
      phone: '11456456',
      role: 1,
    }
    const { org } = await orgController.create(orgDTO)
    expect(org.id).toEqual(expect.any(String))
  })

  test('list', async () => {
    const { orgs } = await orgController.list()
    expect(orgs).toBeInstanceOf(Array)
  })
})
