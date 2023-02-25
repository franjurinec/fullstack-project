import { AspectRatio, Box, Center, Flex, Image } from '@chakra-ui/react'
import { useProducts } from '../../hooks/react-query'

const ProductView = () => {
  const { products, isLoading, error } = useProducts()

  if (isLoading) return null
  if (error) return 'An error occured when loading products!'
  return (
    <Flex gap={8} wrap="wrap">
      {products.map((product) => (
        <Box
          key={product.id}
          w="xs"
          h="sm"
          border="2px"
          borderColor="black"
          borderRadius="lg"
          overflow="hidden"
          _hover={{
            border: '4px',
          }}
        >
          <AspectRatio ratio={1.1}>
            <Center>
              <Image
                h=""
                objectFit="contain"
                src={product.images[0]}
                alt={`${product.name} photo`}
              />
            </Center>
          </AspectRatio>

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
