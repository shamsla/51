import { Button } from '@chakra-ui/react'

export default function CustomButton(props) {
    return (
        <Button
            {...props}
            variant="solid"
            colorScheme="blue"
            size="lg"
            fontSize="17px"
            style={{ padding: '30px 19px' }}
        >
            {props.children}
        </Button>
    )
}
