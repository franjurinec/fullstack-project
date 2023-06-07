import { Flex } from '@chakra-ui/react'
import { useProductsQuery } from '../../../hooks/productHooks'
import ProductCard from './ProductCard'

const ProductList = () => {
  const { data: products, isLoading, error } = useProductsQuery()

  if (isLoading) return null
  if (error) return 'An error occured when loading products!'
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
