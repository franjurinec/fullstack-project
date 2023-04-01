import { Button as ChakraButton } from '@chakra-ui/react'

const Button = ({ onClick, children }) => (
  <ChakraButton
    onClick={onClick}
    bgColor="black"
    textColor="white"
    _hover={{ bg: '#444444' }}
    _active={{
      bg: '#222222',
    }}
    size="lg"
  >
    <>{children}</>
  </ChakraButton>
)

export default Button
