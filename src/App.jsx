import { Box, Container } from '@chakra-ui/react'
import { Header } from './Header'

const App = () => {
  return (
    <Box>
      <Header />
      <Container maxWidth={'8xl'}>
        <Box mx={'16'}>Hello Cloudflare!</Box>
      </Container>
    </Box>
  )
}

export default App
