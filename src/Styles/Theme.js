import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    colorScheme: 'blue',
    useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default theme
