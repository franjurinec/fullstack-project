import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Button from '../../common/Button'

const PasswordForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  return (
    <Box w="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register('password')}
          />

          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Center>
          <Button w="38.2%" mt={4} isLoading={isSubmitting} type="submit">
            Authenticate
          </Button>
        </Center>
      </form>
    </Box>
  )
}

export default PasswordForm
