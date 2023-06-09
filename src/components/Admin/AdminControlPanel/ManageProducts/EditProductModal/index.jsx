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
import {
  useProductQuery,
  useProductUpdateMutation,
} from '../../../../../hooks/productHooks'
import { ProductFormData } from '../../../../../../schema/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

const EditProductModal = ({ productId, isOpen, onClose }) => {
  const PRODUCT_FORM_ID = `edit-product-${productId}`
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProductFormData),
  })

  const { data: product, isLoading, error } = useProductQuery(productId)
  useEffect(() => {
    if (!productId || !product) return
    reset({
      id: productId,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.priceNumerical,
    })
  }, [productId, product, reset])

  const { mutate: editProduct } = useProductUpdateMutation()

  const toast = useToast()
  const onSubmit = handleSubmit((values) => {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={reset}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!(isLoading || error) && (
            <AddProductForm
              formId={PRODUCT_FORM_ID}
              productId={productId}
              register={register}
              errors={errors}
              onSubmit={onSubmit}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            mt={4}
            flexGrow={1}
            type="submit"
            form={PRODUCT_FORM_ID} // Submit button outside form, using id for reference
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProductModal
