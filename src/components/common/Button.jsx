import { Button as ChakraButton } from '@chakra-ui/react'

const Button = ({ onClick, children, ...props }) => (
  <ChakraButton
    onClick={onClick}
    bgColor="black"
    textColor="white"
    _hover={{ bg: '#444444' }}
    _active={{
      bg: '#222222',
    }}
    size="lg"
    {...props}
  >
    <>{children}</>
  </ChakraButton>
)

export default Button
