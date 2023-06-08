import { z } from 'zod'

export const createPetSchema = z.object({
  name: z.string(),
  age: z.number(),
})

export interface CreatePetDTO {
  name: string
  age: number
}
