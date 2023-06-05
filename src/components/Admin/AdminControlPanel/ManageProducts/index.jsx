import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import Button from '../../../common/Button'
import AdminProductsTable from './AdminProductsTable'
import { useProductRemoveMutation } from '../../../../hooks/productHooks'
import { useState } from 'react'
import UpsertProductModal from './UpsertProductModal'

const ManageProducts = () => {
  const toast = useToast()
  const {
    isOpen: isUpsertProductModelOpen,
    onOpen: onUpsertProductModelOpen,
    onClose: onUpsertProductModelClose,
  } = useDisclosure()
  const onAddProduct = () => {
    setEditProductId(undefined)
    onUpsertProductModelOpen()
  }

  const [editProductId, setEditProductId] = useState(undefined)
  const onEditProduct = (id) => {
    setEditProductId(id)
    onUpsertProductModelOpen()
  }

  const { mutate: removeProduct } = useProductRemoveMutation()
  const onRemoveProduct = (id) =>
    removeProduct(id, {
      onSuccess: () =>
        toast({
          title: 'Product removed successfully!',
          status: 'success',
        }),
      onError: () =>
        toast({ title: 'Failed to remove product!', status: 'error' }),
    })

  return (
    <Flex flexDir={'column'} flexGrow={1}>
      <Button mb={8} w={48} onClick={onAddProduct}>
        + New Product
      </Button>
      <UpsertProductModal
        productId={editProductId}
        setProductId={setEditProductId}
        isOpen={isUpsertProductModelOpen}
        onClose={onUpsertProductModelClose}
      />
      <AdminProductsTable
        onEditProduct={onEditProduct}
        onRemoveProduct={onRemoveProduct}
      />
    </Flex>
  )
}
export default ManageProducts
