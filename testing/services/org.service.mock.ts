import { orgEntityList } from '../org-repository.mock'

export const orgServiceMock = {
  create: jest.fn().mockResolvedValue(orgEntityList[0]),
  list: jest.fn().mockResolvedValue(orgEntityList),
  findByEmail: jest.fn(),
  findById: jest.fn(),
}
