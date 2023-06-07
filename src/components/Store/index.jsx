import { Box, Container } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './Cart'
import Header from './Header'
import Order from './Order'
import ProductDetail from './ProductDetail'
import ProductList from './ProductList'

const Store = () => (
  <Box>
    <Header />
    <Container maxWidth="8xl">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  </Box>
)

export default Store
