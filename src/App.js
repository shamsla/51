import { Box, ChakraProvider, Container, Heading } from '@chakra-ui/react'

import PagesMain from 'Pages'
import ContextProvider from 'Context'

import GlobalStyles from 'Styles/Global'
import Theme from 'Styles/Theme'

function App() {
    return (
        <ChakraProvider theme={Theme}>
            <GlobalStyles />
            <ContextProvider>
                <Container centerContent>
                    <Box width="95%" pt={8} textAlign="center" margin="auto">
                        <Heading cursor="pointer" mb={20}>
                            Fifty One
                        </Heading>
                        <PagesMain />
                    </Box>
                </Container>
            </ContextProvider>
        </ChakraProvider>
    )
}

export default App
