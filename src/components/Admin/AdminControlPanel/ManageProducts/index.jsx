import { Flex } from '@chakra-ui/react'
import Button from '../../../common/Button'
import AdminProductsTable from './AdminProductsTable'

const ManageProducts = () => (
  <Flex flexDir={'column'} flexGrow={1}>
    <Button mb={8} w={48}>
      + New Product
    </Button>
    <AdminProductsTable />
  </Flex>
)
export default ManageProducts
