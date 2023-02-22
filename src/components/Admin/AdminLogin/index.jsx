import { Center } from '@chakra-ui/react'
import { authenticate } from '../../../services/authService'
import PasswordForm from './PasswordForm'

const AdminLogin = ({ setAuthenticated }) => {
  const onSubmit = (values) => {
    authenticate(values.password)
      .then(() => setAuthenticated(true))
      .catch((error) => console.error(error))
  }

  return (
    <Center h="calc(100vh)">
      <PasswordForm onSubmit={onSubmit} />
    </Center>
  )
}

export default AdminLogin
