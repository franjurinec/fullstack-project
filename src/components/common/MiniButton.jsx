import { Button as ChakraButton } from '@chakra-ui/react'

const MiniButton = ({ children, ...props }) => (
  <ChakraButton
    bgColor="black"
    textColor="white"
    _hover={{ bg: '#444444' }}
    _active={{
      bg: '#222222',
    }}
    size="sm"
    {...props}
  >
    <>{children}</>
  </ChakraButton>
)

export default MiniButton
