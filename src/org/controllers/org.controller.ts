import { Controller, Body, Post, Get } from '@nestjs/common'
import { CreateOrgDTO } from '../dto/create-org.dto'
import { OrgService } from '../services/org.service'
import { OrgACL } from '../../core/acls/org.acl'
import { Roles } from '../../decorators/roles.decorator'
import { Role } from '../../core/enums/role.enum'
import { Auth } from '../../decorators/auth.decorator'
import { CryptographyService } from '../../core/services/cryptography.service'

@Auth()
@Roles(Role.Admin)
@Controller('orgs')
export class OrgController {
  constructor(
    private readonly orgService: OrgService,
    private readonly cryptographyService: CryptographyService,
  ) {}

  @Post()
  async create(@Body() createOrgDTO: CreateOrgDTO) {
    const org = OrgACL.toEntity({
      ...createOrgDTO,
      password: await this.cryptographyService.hash(createOrgDTO.password),
    })
    const prismaOrg = await this.orgService.create(org)
    return { org: OrgACL.toDTO(prismaOrg) }
  }

  @Get()
  async list() {
    const orgs = await this.orgService.list()
    return { orgs: OrgACL.toDTOs(orgs) }
  }
}
