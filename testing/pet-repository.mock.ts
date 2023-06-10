const petDTOList = [
  {
    id: '1fb73f97-3101-44b9-a55c-ea23b95ccb86',
    name: 'Bolt',
    description: 'cachorro danado',
    age: 7,
    size: 'small',
    createdAt: '2023-06-10T16:05:28.824Z',
    orgId: '5cf05b54-432e-46cd-93ed-7b7c019c4847',
  },
  {
    id: '2de992e0-8eb1-4ea9-99b9-874c8b15d7d3',
    name: 'Bolt',
    description: 'cachorro danado',
    age: 7,
    size: 'small',
    createdAt: '2023-06-10T16:33:16.916Z',
    orgId: '5cf05b54-432e-46cd-93ed-7b7c019c4847',
  },
  {
    id: '3cc0c6d0-2b80-4174-91ff-cd9c73109b85',
    name: 'Bolt',
    description: 'cachorro danado',
    age: 7,
    size: 'small',
    createdAt: '2023-06-10T16:05:12.964Z',
    orgId: '5cf05b54-432e-46cd-93ed-7b7c019c4847',
  },
]

export const petRepositoryMock = {
  pet: {
    create: jest.fn().mockResolvedValue({
      id: '1fb73f97-3101-44b9-a55c-ea23b95ccb86',
      name: 'Bolt',
      description: 'cachorro danado',
      age: 7,
      size: 'small',
      createdAt: '2023-06-10T16:05:28.824Z',
      orgId: '5cf05b54-432e-46cd-93ed-7b7c019c4847',
    }),
    findMany: jest.fn().mockResolvedValue([petDTOList[1]]),
    findUnique: jest.fn().mockResolvedValue(petDTOList[0]),
  },
}
