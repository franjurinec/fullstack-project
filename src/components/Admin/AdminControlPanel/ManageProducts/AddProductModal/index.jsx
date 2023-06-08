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
import AddProductForm from './AddProductForm'
import Button from '../../../../common/Button'
import { useForm } from 'react-hook-form'
import { useProductCreateMutation } from '../../../../../hooks/productHooks'

const AddProductModal = ({ isOpen, onClose }) => {
  const toast = useToast()

  const PRODUCT_FORM_ID = 'add-product-form'
  const formHook = useForm()

  const { mutate: createProduct } = useProductCreateMutation()

  const onSubmit = formHook.handleSubmit((values) => {
    createProduct(values, {
      onSuccess: () =>
        toast({
          title: 'Product added successfully!',
          status: 'success',
        }),
    })
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

export default AddProductModal
