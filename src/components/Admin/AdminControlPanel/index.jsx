import { Button } from '@chakra-ui/react'
import { useDeleteAuth } from '../../../hooks/react-query'

const AdminControlPanel = () => {
  const { deleteAuth } = useDeleteAuth()

  return (
    <Button mt={4} colorScheme="blackAlpha" onClick={deleteAuth}>
      Sign Out
    </Button>
  )
}

export default AdminControlPanel
