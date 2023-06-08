import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react'
import AddProductForm from './EditProductForm'
import Button from '../../../../common/Button'
import { useForm } from 'react-hook-form'
import { useProductUpdateMutation } from '../../../../../hooks/productHooks'

const EditProductModal = ({ productId, isOpen, onClose }) => {
  const PRODUCT_FORM_ID = `edit-product-${productId}`
  const formHook = useForm()

  const { mutate: editProduct } = useProductUpdateMutation()

  const toast = useToast()
  const onSubmit = formHook.handleSubmit((values) => {
    editProduct(
      { id: values.id, product: values },
      {
        onSuccess: () =>
          toast({
            title: 'Product updated successfully!',
            status: 'success',
          }),
      }
    )
    onClose()
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={formHook.reset}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddProductForm
            formId={PRODUCT_FORM_ID}
            productId={productId}
            formHook={formHook}
            onSubmit={onSubmit}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            mt={4}
            flexGrow={1}
            type="submit"
            form={PRODUCT_FORM_ID} // Submit button outside form, using id for reference
            isLoading={formHook.isSubmitting}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProductModal
