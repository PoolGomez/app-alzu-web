import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tableSchema = z.object({
  _id: z.string(),
  title: z.string(),
  seats:z.number(),
  status: z.string(),
  roomId: z.string(),
  companyId: z.string(),
//   label: z.string(),
//   priority: z.string(),
})

export type TableSchema = z.infer<typeof tableSchema>