import {
  Flex,
  Text,
  Image,
  AspectRatio,
  Heading,
  useToast,
} from '@chakra-ui/react'
import Button from '../common/Button'
import { useProductQuery } from '../../hooks/productHooks'
import { useParams } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'

const ProductDetail = () => {
  const params = useParams()
  const { data: product, isLoading, error } = useProductQuery(params.id)

  const toast = useToast()

  const addToCart = useCartStore((state) => state.add)
  const onAddToCartClicked = () => {
    addToCart(product, 1)
    toast({
      title: 'Added to cart!',
      status: 'success',
    })
  }

  if (isLoading) return null
  if (error) return `An error occured when loading product ${params.id}!`
  return (
    <Flex data-test-class={'product-details'} gap={16} wrap="wrap">
      <Flex direction="column" width="xl">
        <AspectRatio ratio={1.1}>
          <Image src={product.image} borderRadius="lg" />
        </AspectRatio>
      </Flex>
      <Flex direction="column" gap={4}>
        <Heading>{product.name}</Heading>
        <Text>{product.description ?? 'No description available.'}</Text>
        <Heading>{product.price}</Heading>
        <Button onClick={onAddToCartClicked}>Add to cart</Button>
      </Flex>
    </Flex>
  )
}

export default ProductDetail
