import { CreateOrgDTO } from '../../org/dto/create-org.dto'
import { OrgDTO } from '../../org/dto/org.dto'
import { OrgEntity } from '../../org/entities/org.entity'

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

  static toDTOs(orgsEntities: OrgEntity[]): OrgDTO[] {
    return orgsEntities.map((org) => ({
      id: org.id.value,
      city: org.city,
      email: org.email,
      phone: org.phone,
      role: org.role,
    }))
  }

  static toDTO(orgEntity: OrgEntity): OrgDTO {
    return {
      id: orgEntity.id.value,
      city: orgEntity.city,
      email: orgEntity.email,
      phone: orgEntity.phone,
      role: orgEntity.role,
    }
  }
}
