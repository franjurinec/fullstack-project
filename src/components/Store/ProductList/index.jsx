import { Center, Flex, Heading, Spinner } from '@chakra-ui/react'
import { useProductsQuery } from '../../../hooks/productHooks'
import ProductCard from './ProductCard'

const ProductList = () => {
  const { data: products, isLoading, error } = useProductsQuery()

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center>
        <Heading size="4xl" fontWeight="thin">
          AN ERROR OCCURED
        </Heading>
      </Center>
    )
  }

  return (
    <Flex
      data-test-class={'product-list'}
      gap={8}
      wrap="wrap"
      justifyContent="center"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Flex>
  )
}

export default ProductList
