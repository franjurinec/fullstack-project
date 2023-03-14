import { Box, Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Header from './Header'
import ProductDetail from './ProductDetail'
import ProductView from './ProductView'

const Store = () => (
  <Box>
    <Header />
    <Container maxWidth={'8xl'}>
      <Routes>
        <Route path="/" element={<ProductView />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Container>
  </Box>
)

export default Store
