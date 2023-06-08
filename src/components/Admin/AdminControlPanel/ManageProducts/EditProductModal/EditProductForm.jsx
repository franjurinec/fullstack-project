import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useProductQuery } from '../../../../../hooks/productHooks'

const EditProductForm = ({
  productId,
  formId,
  formHook: {
    register,
    formState: { errors },
    reset,
  },
  onSubmit,
}) => {
  const { data: product, isLoading, error } = useProductQuery(productId)

  useEffect(() => {
    if (!productId || !product) return
    reset({
      id: productId,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.priceNumerical,
    })
  }, [productId, product, reset])

  if (isLoading) return null
  if (error) return 'Error while fetching product information.'

  return (
    <form data-test-id={'product-edit-form'} id={formId} onSubmit={onSubmit}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          isRequired
          placeholder="Product Name"
          {...register('name', {
            required: 'Name is required.',
            minLength: {
              value: 2,
              message: 'Name needs to be longer than 2 characters.',
            },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={6} isInvalid={errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          id="description"
          placeholder="This is a product which..."
          {...register('description', {
            required: 'Description is required.',
            minLength: {
              value: 10,
              message: 'Description need to be 10 characters or longer.',
            },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={6} isInvalid={errors.image}>
        <FormLabel htmlFor="image">Cover Image URL</FormLabel>
        <Input
          id="image"
          placeholder="https://images.com/some-image.jpg"
          {...register('image', {
            required: 'A cover image is required.',
            pattern: {
              value:
                /(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
              message: 'Please enter a valid URL.',
            },
          })}
        />
        <FormErrorMessage>
          {errors.image && errors.image.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt={6} isInvalid={errors.price}>
        <FormLabel htmlFor="price">Price in EUR</FormLabel>
        <Input
          id="price"
          type="number"
          placeholder="100.00"
          {...register('price', {
            required: 'Price is required.',
            valueAsNumber: true,
            min: { value: 0.01, message: 'Price has to be at least 0.01 EUR.' },
          })}
        />
        <FormErrorMessage>
          {errors.price && errors.price.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}

export default EditProductForm
