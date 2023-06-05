import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'

const AddProductForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  formId,
}) => {
  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          isRequired
          placeholder="Product Name"
          {...register('name')}
        />

        <FormLabel mt={6}>Description</FormLabel>
        <Input
          id="description"
          isRequired
          placeholder="This is a product which..."
          {...register('description')}
        />

        <FormLabel mt={6}>Cover Image URL</FormLabel>
        <Input
          id="image"
          type="url"
          placeholder="https://images.com/some-image.jpg"
          {...register('image')}
        />

        <FormLabel mt={6}>Price in EUR</FormLabel>
        <Input
          id="price"
          isRequired
          type="number"
          placeholder="100.00"
          {...register('price')}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}

export default AddProductForm
