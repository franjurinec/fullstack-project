import { extendTheme } from '@chakra-ui/react'

// Fonts
import '@fontsource/inter/variable.css'

const theme = extendTheme({
  fonts: {
    heading: `'InterVariable', sans-serif`,
  },
})

export default theme
