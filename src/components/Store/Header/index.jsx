import { Flex, Heading, Text } from '@chakra-ui/react'

const Header = () => (
  <Flex
    alignItems={'center'}
    as={'header'}
    px={'16'}
    height={'32'}
    mb={'16'}
    borderBottom={'2px'}
  >
    <Heading size={'3xl'}>
      GOOD.
      <Text as={'span'} fontWeight={'thin'}>
        STORE
      </Text>
    </Heading>
  </Flex>
)

export default Header
