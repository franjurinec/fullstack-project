import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import AddProductForm from './AddProductForm'
import Button from '../../../../common/Button'
import { useForm } from 'react-hook-form'
import { useProductCreateMutation } from '../../../../../hooks/productHooks'

const AddProductModal = ({ isOpen, onClose }) => {
  const PRODUCT_FORM_ID = 'add-product-form'
  const formHook = useForm()

  const { mutate: createProduct } = useProductCreateMutation()
  const productFromValues = (values) => ({
    name: values.name,
    description: values.description,
    default_price_data: {
      currency: 'EUR',
      unit_amount: Math.round(values.price * 100),
    },
    images: [values.image],
  })

  const onSubmit = formHook.handleSubmit((values) => {
    createProduct(productFromValues(values))
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