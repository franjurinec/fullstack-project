import { Box, Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Cart from './Cart'
import Header from './Header'
import ProductDetail from './ProductDetail'
import ProductList from './ProductList'

const Store = () => (
  <Box>
    <Header />
    <Container maxWidth={'8xl'}>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Container>
  </Box>
)

export default Store
