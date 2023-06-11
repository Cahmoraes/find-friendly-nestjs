import { orgEntityList } from '../org-repository.mock'

export const orgServiceMock = {
  create: jest.fn().mockResolvedValue(orgEntityList[0]),
  list: jest.fn().mockResolvedValue(orgEntityList),
  findByEmail: jest.fn().mockResolvedValue(orgEntityList[0]),
  findById: jest.fn().mockResolvedValue(orgEntityList[0]),
}
