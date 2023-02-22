import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const PasswordForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <Input id="password" placeholder="Password" {...register('password')} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="blackAlpha"
        isLoading={isSubmitting}
        type="submit"
      >
        Verify
      </Button>
    </form>
  )
}

export default PasswordForm
