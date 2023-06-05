import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import MiniButton from '../../../../common/MiniButton'
import { useForm } from 'react-hook-form'
import AddProductForm from './AddProductForm'
import { useEffect } from 'react'
import {
  useProductCreateMutation,
  useProductQuery,
  useProductUpdateMutation,
} from '../../../../../hooks/productHooks'

const UpsertProductModal = ({ productId, setProductId, isOpen, onClose }) => {
  const PRODUCT_FORM_ID = 'product-form'

  const toast = useToast()

  const { data: product, isLoading, error } = useProductQuery(productId)

  const { mutate: createProduct } = useProductCreateMutation()
  const { mutate: updateProduct } = useProductUpdateMutation()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({ defaultValues: { id: productId } })

  const initEditForm = () => {
    setValue('id', productId)
    if (!productId || isLoading || error) return
    setValue('name', product.name)
    setValue('description', product.description)
    setValue('image', product.image)
    setValue('price', product.priceNumerical)
  }

  useEffect(initEditForm, [product, productId])

  const onCloseComplete = () => {
    setProductId(null)
    reset()
  }

  const onSubmit = (data) => {
    const newProduct = {
      name: data.name,
      description: data.description,
      default_price_data: {
        currency: 'EUR',
        unit_amount: Math.round(data.price * 100),
      },
      images: [data.image],
    }

    if (data.id) {
      updateProduct(
        { id: data.id, product: newProduct },
        {
          onSuccess: () =>
            toast({
              title: 'Product updated successfully!',
              status: 'success',
            }),
          onError: () =>
            toast({
              title: 'Failed to update product.',
              status: 'error',
            }),
        }
      )
    } else {
      createProduct(newProduct, {
        onSuccess: () =>
          toast({
            title: 'Product added successfully!',
            status: 'success',
          }),
        onError: () =>
          toast({
            title: 'Failed to add product.',
            status: 'error',
          }),
      })
    }

    onClose()
  }

  if (isLoading || error) return null
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {productId ? 'Edit Product' : 'Create a New Product'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddProductForm
            formId={PRODUCT_FORM_ID}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </ModalBody>
        <ModalFooter>
          <Flex gap={4}>
            <MiniButton onClick={onClose}>Cancel</MiniButton>
            <MiniButton
              type="submit"
              form={PRODUCT_FORM_ID}
              isLoading={isSubmitting}
            >
              Submit
            </MiniButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpsertProductModal
