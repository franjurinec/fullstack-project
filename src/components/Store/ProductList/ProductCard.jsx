import { AspectRatio, Flex, Image, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product.id.substring(5)}`}
      style={{ textDecoration: 'none' }}
    >
      <Flex
        w="xs"
        h="sm"
        border="2px"
        borderColor="black"
        borderRadius="lg"
        overflow="hidden"
        direction="column"
        _hover={{
          border: '4px',
        }}
        _active={{
          borderStyle: 'double',
        }}
      >
        <AspectRatio ratio={1.1}>
          <Image
            pointerEvents="none"
            fit="cover"
            src={product.image}
            alt={`${product.name} photo`}
          />
        </AspectRatio>

        <Flex
          flexGrow={1}
          p="6"
          alignItems="center"
          borderColor="black"
          borderTop="2px"
        >
          <Text fontWeight="semibold" fontSize="lg" flexGrow={1}>
            {product.name}
          </Text>
          <Text fontWeight="semibold" fontSize="lg">
            {product.price}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}

export default ProductCard
