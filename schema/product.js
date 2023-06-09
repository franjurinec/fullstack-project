import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  price: z.string(),
  priceId: z.string(),
  priceNumerical: z.number(),
})

export const productsSchema = z.array(productSchema)

export const productFormSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required.' }),
  description: z
    .string()
    .nonempty({ message: 'Description is required.' })
    .min(10, { message: 'Description has to be at least 10 characters.' })
    .max(256, { message: 'Description can be at most 256 characters.' }),
  image: z
    .string()
    .nonempty({ message: 'Image URL is required.' })
    .url({ message: 'Has to be a valid URL.' }),
  price: z
    .number({ invalid_type_error: 'Price is required.' })
    .min(0.1, { message: 'Pirce has to be at least 0.01 EUR.' }),
})
