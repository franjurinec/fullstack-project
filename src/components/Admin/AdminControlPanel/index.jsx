import { Route, Routes } from 'react-router-dom'
import ManageProducts from './ManageProducts'
import { Center, Container, Heading } from '@chakra-ui/react'

const AdminControlPanel = () => {
  return (
    <>
      <Container maxWidth="8xl" pt={12}>
        <Center>
          <Heading fontSize="6xl" fontWeight="thin">
            Admin Center
          </Heading>
        </Center>
        <Routes>
          <Route path="/" element={<ManageProducts />} />
        </Routes>
      </Container>
    </>
  )
}

export default AdminControlPanel
