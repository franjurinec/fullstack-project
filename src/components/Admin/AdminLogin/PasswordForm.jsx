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
    <Box w="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.password}>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register('password', { required: 'Admin password required.' })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Center>
          <Button mt={4} isLoading={isSubmitting} type="submit">
            Authenticate
          </Button>
        </Center>
      </form>
    </Box>
  )
}

export default PasswordForm
