import useAuthDeleteMutation from '../../../hooks/useAuthDeleteMutation'
import Button from '../../common/Button'

const AdminControlPanel = () => {
  const { mutate: deleteAuth } = useAuthDeleteMutation()

  return (
    <Button mt={4} colorScheme="blackAlpha" onClick={deleteAuth}>
      Sign Out
    </Button>
  )
}

export default AdminControlPanel
