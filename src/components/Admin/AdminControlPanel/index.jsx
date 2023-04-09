import { Route, Routes, Link as RouterLink } from 'react-router-dom'
import useAuthDeleteMutation from '../../../hooks/useAuthDeleteMutation'
import ManageSite from './ManageSite'
import ManageProducts from './ManageProducts'
import ButtonPrimary from '../../common/Button'
import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Link,
} from '@chakra-ui/react'

const AdminControlPanel = () => {
  const { mutate: deleteAuth } = useAuthDeleteMutation()

  return (
    <>
      <Container maxWidth="8xl" pt={12}>
        <Center>
          <Heading fontSize="6xl" fontWeight="thin">
            Admin Center
          </Heading>
        </Center>
        <Flex mt={8}>
          <Flex
            as="nav"
            flexDir="column"
            w="xs"
            pr={8}
            mr={8}
            py={8}
            gap={2}
            borderRight="2px solid black"
          >
            <Link
              as={RouterLink}
              to={`/admin`}
              style={{ textDecoration: 'none' }}
            >
              <Button w="100%" variant="ghost">
                Manage Store Site
              </Button>
            </Link>
            <Link
              as={RouterLink}
              to={`/admin/products`}
              style={{ textDecoration: 'none' }}
            >
              <Button w="100%" variant="ghost">
                Manage Products
              </Button>
            </Link>
            <ButtonPrimary onClick={deleteAuth}>Sign Out</ButtonPrimary>
          </Flex>
          <Routes>
            <Route path="/" element={<ManageSite />} />
            <Route path="/products" element={<ManageProducts />} />
          </Routes>
        </Flex>
      </Container>
    </>
  )
}

export default AdminControlPanel
