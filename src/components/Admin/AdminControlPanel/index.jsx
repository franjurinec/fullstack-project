import { Button } from '@chakra-ui/react'
import useAuthDeleteMutation from '../../../hooks/useAuthDeleteMutation'

const AdminControlPanel = () => {
  const { mutate: deleteAuth } = useAuthDeleteMutation()

  return (
    <Button mt={4} colorScheme="blackAlpha" onClick={deleteAuth}>
      Sign Out
    </Button>
  )
}

export default AdminControlPanel
