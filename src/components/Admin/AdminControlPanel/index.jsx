import { Button } from '@chakra-ui/react'
import { signout } from '../../../services/authService'

const AdminControlPanel = ({ setAuthenticated }) => {
  const handleSignout = () => {
    signout()
    setAuthenticated(false)
  }
  return (
    <Button mt={4} colorScheme="blackAlpha" onClick={handleSignout}>
      Sign Out
    </Button>
  )
}

export default AdminControlPanel
