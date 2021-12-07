import { Input, theme } from '@chakra-ui/react'
import styled from 'styled-components'

export default function CustomInput(props) {
    return (
        <StyledInput
            fontSize={16}
            size="lg"
            borderWidth="1px"
            variant="filled"
            bg="gray.200"
            borderColor="gray.300"
            style={{ padding: '30px 19px' }}
            {...props}
        />
    )
}

const StyledInput = styled(Input)`
    transition: all 0.3s !important;
    outline-offset: 0px;

    &:focus {
        border-color: rgba(0, 0, 0, 0);
        outline: 2px solid ${_ => theme.colors.blue['500']};
    }
`
