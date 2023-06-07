import { Center } from '@chakra-ui/react'
import PasswordForm from './PasswordForm'
import { useAuthCreateMutation } from '../../../hooks/authHooks'

const AdminLogin = () => {
  const { mutate: authenticate } = useAuthCreateMutation()

  return (
    <Center h="calc(100vh)">
      <PasswordForm onSubmit={(values) => authenticate(values.password)} />
    </Center>
  )
}

export default AdminLogin
