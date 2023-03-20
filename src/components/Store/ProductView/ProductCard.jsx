import { AspectRatio, Box, Center, Image, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product.id.substring(5)}`}
      style={{ textDecoration: 'none' }}
    >
      <Box
        w="xs"
        h="sm"
        border="2px"
        borderColor="black"
        borderRadius="lg"
        overflow="hidden"
        _hover={{
          border: '4px',
        }}
        _active={{
          borderStyle: 'double',
        }}
      >
        <AspectRatio ratio={1.1}>
          <Center>
            <Image
              pointerEvents="none"
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
    </Link>
  )
}

export default ProductCard
