import { Box, Flex, Image } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { GET_PRODUCTS } from '../../services/productService'

const ProductView = () => {
  const { data: products, error, isLoading } = useQuery(GET_PRODUCTS)

  if (isLoading) return null
  if (error) return 'An error occured!'
  return (
    <Flex gap={8}>
      {products.map((product) => (
        <Box
          key={product.id}
          w="md"
          h="md"
          border="2px"
          borderColor="black"
          borderRadius="lg"
          overflow="hidden"
          _hover={{
            border: '4px',
          }}
        >
          <Image
            h="xs"
            p={4}
            objectFit="contain"
            src={product.images[0]}
            alt={`${product.name} photo`}
          />

          <Box p="6" borderColor="black" borderTop="2px">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {product.name}
            </Box>
          </Box>
        </Box>
      ))}
    </Flex>
  )
}

export default ProductView
