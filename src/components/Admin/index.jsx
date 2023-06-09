import AdminLogin from './AdminLogin'
import AdminControlPanel from './AdminControlPanel'
import { useAuthStatusQuery } from '../../hooks/authHooks'
import { Center, Heading } from '@chakra-ui/react'

const Admin = () => {
  const { data: authorized, isLoading, error } = useAuthStatusQuery()

  if (isLoading) return null

  if (error) {
    return (
      <Center>
        <Heading size="4xl" fontWeight="thin">
          AN ERROR OCCURED
        </Heading>
      </Center>
    )
  }

  if (authorized) return <AdminControlPanel />
  return <AdminLogin />
}

export default Admin
