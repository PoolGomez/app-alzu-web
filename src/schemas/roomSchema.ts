
import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const roomSchema = z.object({
  _id: z.string(),
  title: z.string(),
  companyId: z.string(),
  visible: z.boolean(),
})

export type RoomSchema = z.infer<typeof roomSchema>