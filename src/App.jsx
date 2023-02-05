import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'

function App() {
  return (
    <Box>
      <Flex
        alignItems={'center'}
        as={'header'}
        px={'16'}
        height={'32'}
        mb={'16'}
        borderBottom={'2px'}
      >
        <Heading size={'3xl'} stroke={''}>
          GOOD.
          <Text as={'span'} color={'blackAlpha.400'}>
            STORE
          </Text>
        </Heading>
      </Flex>
      <Container maxWidth={'8xl'}>Hello Cloudflare!</Container>
    </Box>
  )
}

export default App
