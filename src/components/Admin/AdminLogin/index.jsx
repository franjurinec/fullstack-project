import { Center, useToast } from '@chakra-ui/react'
import useAuthCreateMutation from '../../../hooks/useAuthCreateMutation'
import PasswordForm from './PasswordForm'

const AdminLogin = () => {
  const { mutate: authenticate } = useAuthCreateMutation()
  const toast = useToast()

  const showAuthError = () =>
    toast({ title: 'Authentication error!', status: 'error' })

  const onSubmit = (values) =>
    authenticate(values.password, { onError: showAuthError })

  return (
    <Center h="calc(100vh)">
      <PasswordForm onSubmit={onSubmit} />
    </Center>
  )
}

export default AdminLogin
