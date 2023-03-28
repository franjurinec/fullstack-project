import {
  Flex,
  Text,
  Image,
  AspectRatio,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react'
import useProductQuery from '../../hooks/useProductQuery'
import { useParams } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'

const ProductDetail = () => {
  const params = useParams()
  const {
    data: product,
    isLoading,
    error,
  } = useProductQuery(`prod_${params.id}`)

  const addToCart = useCartStore((state) => state.add)

  const toast = useToast()

  const onAddToCartClicked = () => {
    addToCart(product, 1)
    toast({
      title: 'Added to cart!',
      status: 'success',
      duration: 3600,
    })
  }

  if (isLoading) return null
  if (error) return `An error occured when loading product ${params.id}!`
  return (
    <Flex gap={16} wrap="wrap">
      <Flex direction="column" width="xl">
        <AspectRatio ratio={1.1}>
          <Image src={product.image} borderRadius="lg" />
        </AspectRatio>
      </Flex>
      <Flex direction="column" gap={4}>
        <Heading>{product.name}</Heading>
        <Text>{product.description}</Text>
        <Heading>{product.price}</Heading>
        <Button
          onClick={onAddToCartClicked}
          bgColor="black"
          textColor="white"
          _hover={{ bg: '#444444' }}
          _active={{
            bg: '#222222',
          }}
          size="lg"
        >
          Add to cart
        </Button>
      </Flex>
    </Flex>
  )
}

export default ProductDetail
