import { Center } from '@chakra-ui/react'
import { useAuth } from '../../../hooks/react-query'
import PasswordForm from './PasswordForm'

const AdminLogin = () => {
  const { authenticate } = useAuth()

  const onSubmit = (values) => authenticate(values.password)

  return (
    <Center h="calc(100vh)">
      <PasswordForm onSubmit={onSubmit} />
    </Center>
  )
}

export default AdminLogin
