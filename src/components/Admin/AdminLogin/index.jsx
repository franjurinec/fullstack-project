import { Center, useToast } from '@chakra-ui/react'
import PasswordForm from './PasswordForm'
import { useAuthCreateMutation } from '../../../hooks/authHooks'

const AdminLogin = () => {
  const { mutate: authenticate } = useAuthCreateMutation()
  const toast = useToast()

  const showAuthError = (error) =>
    toast({ title: error.message, status: 'error' })

  const onSubmit = (values) =>
    authenticate(values.password, { onError: showAuthError })

  return (
    <Center h="calc(100vh)">
      <PasswordForm onSubmit={onSubmit} />
    </Center>
  )
}

export default AdminLogin
