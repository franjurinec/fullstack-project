import { Flex, Heading, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  return (
    <Flex
      justifyContent="center"
      maxWidth="full"
      width="full"
      borderBottom="2px"
      mb="16"
    >
      <Flex
        as="header"
        px="16px"
        height="32"
        maxWidth="8xl"
        flexGrow={1}
        alignItems="center"
      >
        <Link as={RouterLink} to="/" style={{ textDecoration: 'none' }}>
          <Heading size="3xl">
            GOOD.
            <Text as="span" fontWeight="thin">
              STORE
            </Text>
          </Heading>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Header
