import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'

const EditProductForm = ({ formId, register, errors, onSubmit }) => (
  <form data-test-id={'product-edit-form'} id={formId} onSubmit={onSubmit}>
    <FormControl isInvalid={errors.name}>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input id="name" placeholder="Product Name" {...register('name')} />
      <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
    </FormControl>

    <FormControl mt={6} isInvalid={errors.description}>
      <FormLabel htmlFor="description">Description</FormLabel>
      <Input
        id="description"
        placeholder="This is a product which..."
        {...register('description')}
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
        {...register('image')}
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
        {...register('price', { valueAsNumber: true })}
      />
      <FormErrorMessage>
        {errors.price && errors.price.message}
      </FormErrorMessage>
    </FormControl>
  </form>
)

export default EditProductForm
