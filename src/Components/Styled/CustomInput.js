import { Input } from '@chakra-ui/react'

export default function CustomInput(props) {
    return (
        <Input
            {...props}
            fontSize={17}
            size="lg"
            style={{ padding: '30px 19px' }}
        />
    )
}
