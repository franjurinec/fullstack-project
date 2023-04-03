import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Link,
} from '@chakra-ui/react'
import useAuthDeleteMutation from '../../../hooks/useAuthDeleteMutation'
import ButtonPrimary from '../../common/Button'
import { AddIcon } from '@chakra-ui/icons'
import { Route, Routes, Link as RouterLink } from 'react-router-dom'
import AdminProductList from './AdminProductList'
import NewProduct from './NewProduct'

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
                Manage Products
              </Button>
            </Link>
            <Link
              as={RouterLink}
              to={`/admin/new`}
              style={{ textDecoration: 'none' }}
            >
              <Button w="100%" variant="ghost">
                <AddIcon boxSize={3} mr={2} /> New Product
              </Button>
            </Link>
            <ButtonPrimary onClick={deleteAuth}>Sign Out</ButtonPrimary>
          </Flex>
          <Routes>
            <Route path="/" element={<AdminProductList />} />
            <Route path="/new" element={<NewProduct />} />
          </Routes>
        </Flex>
      </Container>
    </>
  )
}

export default AdminControlPanel
