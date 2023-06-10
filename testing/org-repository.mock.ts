import { OrgEntity } from '../src/org/entities/org.entity'

export const orgEntityList = [
  OrgEntity.create({
    city: 'Osasco 1',
    email: 'test1@example.com',
    password: '1234561',
    phone: '11456456',
    role: 1,
  }),
  OrgEntity.create({
    city: 'Osasco 2',
    email: 'test2@example.com',
    password: '1234562',
    phone: '11456456',
    role: 1,
  }),
  OrgEntity.create({
    city: 'Osasco 3',
    email: 'test3@example.com',
    password: '1234563',
    phone: '11456456',
    role: 2,
  }),
]

export const orgRepositoryMock = {
  org: {
    create: jest.fn().mockResolvedValue(
      OrgEntity.create({
        city: 'Osasco',
        email: 'test@example.com',
        password: '123456',
        phone: '11456456',
        role: 1,
      }),
    ),
    findMany: jest.fn().mockResolvedValue(orgEntityList),
    findUnique: jest.fn().mockResolvedValue(orgEntityList[0]),
  },
}
