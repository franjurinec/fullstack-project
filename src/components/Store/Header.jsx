import { Flex, Heading, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  return (
    <Flex
      alignItems={'center'}
      as={'header'}
      px={'16'}
      height={'32'}
      mb={'16'}
      borderBottom={'2px'}
    >
      <Link as={RouterLink} to={'/'} style={{ textDecoration: 'none' }}>
        <Heading size={'3xl'}>
          GOOD.
          <Text as={'span'} fontWeight={'thin'}>
            STORE
          </Text>
        </Heading>
      </Link>
    </Flex>
  )
}

export default Header
