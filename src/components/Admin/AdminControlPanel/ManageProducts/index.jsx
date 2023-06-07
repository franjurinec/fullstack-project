import { Flex, useDisclosure } from '@chakra-ui/react'
import Button from '../../../common/Button'
import AdminProductsTable from './AdminProductsTable'
import AddProductModal from './AddProductModal'

const ManageProducts = () => {
  const addDisclosure = useDisclosure()

  return (
    <Flex flexDir={'column'} flexGrow={1}>
      <Button mb={8} w={48} onClick={addDisclosure.onOpen}>
        + New Product
      </Button>
      <AddProductModal
        isOpen={addDisclosure.isOpen}
        onClose={addDisclosure.onClose}
      />
      <AdminProductsTable />
    </Flex>
  )
}
export default ManageProducts
