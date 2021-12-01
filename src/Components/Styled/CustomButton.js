import { Button } from '@chakra-ui/react'

export default function CustomButton(props) {
    return (
        <Button
            {...props}
            variant="solid"
            colorScheme="blue"
            size="lg"
            fontSize="17px"
            style={{ paddingTop: '30px', paddingBottom: '30px' }}
        >
            {props.children}
        </Button>
    )
}
