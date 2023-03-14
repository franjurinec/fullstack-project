import { Center } from '@chakra-ui/react'
import useAuthCreateMutation from '../../../hooks/useAuthCreateMutation'
import PasswordForm from './PasswordForm'

const AdminLogin = () => {
  const { mutate: authenticate } = useAuthCreateMutation()

  const onSubmit = (values) => authenticate(values.password)

  return (
    <Center h="calc(100vh)">
      <PasswordForm onSubmit={onSubmit} />
    </Center>
  )
}

export default AdminLogin
