import z, { object, string } from 'zod'

export const companySchema = object({
  name: string({ error: "El nombre es requerido" })
    .min(1, "El nombre es requerido"),
    // .email("Invalid email"),
  description: string(
    // { error: "Password is required" }
    )
    // .min(1, "Password is required")
    // .min(6, "Password must be more than 6 characters")
    .max(100, "La descripción no puede tener mas de 100 caracteres"),
    
    owner: string()
})

export type CompanySchema = z.infer<typeof companySchema>