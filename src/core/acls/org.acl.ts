import { CreateOrgDTO } from '../../org/dto/create-org.dto'
import { OrgEntity } from '../../org/entity/org'

export class OrgACL {
  static toEntities(createOrgDTOs: CreateOrgDTO[]): OrgEntity[] {
    return createOrgDTOs.map(this.toEntity)
  }

  static toEntity(createOrgDTO: CreateOrgDTO): OrgEntity {
    return OrgEntity.create({
      city: createOrgDTO.city,
      email: createOrgDTO.email,
      password: createOrgDTO.password,
      phone: createOrgDTO.phone,
      role: createOrgDTO.role,
    })
  }

  static toDTOs(orgsEntities: OrgEntity[]): CreateOrgDTO[] {
    return orgsEntities.map((org) => ({
      city: org.city,
      email: org.email,
      password: org.password,
      phone: org.phone,
      role: org.role,
    }))
  }

  static toDTO(orgEntity: OrgEntity): CreateOrgDTO {
    return {
      city: orgEntity.city,
      email: orgEntity.email,
      password: orgEntity.password,
      phone: orgEntity.phone,
      role: orgEntity.role,
    }
  }
}
