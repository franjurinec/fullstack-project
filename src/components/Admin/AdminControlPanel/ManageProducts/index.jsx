import { Center, Container, Flex, useDisclosure } from '@chakra-ui/react'
import Button from '../../../common/Button'
import AdminProductsTable from './AdminProductsTable'
import AddProductModal from './AddProductModal'
import { useAuthDeleteMutation } from '../../../../hooks/authHooks'

const ManageProducts = () => {
  const addDisclosure = useDisclosure()

  const { mutate: deleteAuth } = useAuthDeleteMutation()

  return (
    <Container maxW={'container.md'} mt={8}>
      <Center>
        <Flex flexDir={'column'} flexGrow={1} w={'container.sm'}>
          <Flex justifyContent={'space-between'}>
            <Button mb={8} w={48} onClick={addDisclosure.onOpen}>
              + New Product
            </Button>
            <Button onClick={deleteAuth}>Sign Out</Button>
          </Flex>

          <AddProductModal
            isOpen={addDisclosure.isOpen}
            onClose={addDisclosure.onClose}
          />
          <AdminProductsTable />
        </Flex>
      </Center>
    </Container>
  )
}
export default ManageProducts
