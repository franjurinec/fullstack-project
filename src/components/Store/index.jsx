import { Box, Container } from '@chakra-ui/react'
import Header from './Header'
import ProductView from './ProductView'

const Store = () => (
  <Box>
    <Header />
    <Container maxWidth={'8xl'}>
      <ProductView />
    </Container>
  </Box>
)

export default Store
