import { useContext, useState } from 'react'
import {
    Box,
    Container,
    FormControl,
    FormErrorMessage,
    Stack,
} from '@chakra-ui/react'
import { PAGES } from 'Constants'
import { AppContext } from 'Context'
import useForm from 'Hooks/useForm'
import { validateEncryptionKey } from 'Utils/encrytion'
import CustomInput from 'Components/Styled/CustomInput'
import CustomButton from 'Components/Styled/CustomButton'

export default function Credentials() {
    const [inputs, setInput, setInputsForcefully] = useForm({
        encryptionKey: 'XswRunJ3hvXcUiPeH8E2wK9eMfjxDI91',
    })
    const [isEncryptionKeyInValid, setIsEncryptionKeyInValid] = useState(false)
    const {
        actions: { setEncryptionKey, setActivePage, setMultiple },
    } = useContext(AppContext)

    const onSubmit = () => {
        const encryptionKey = inputs.encryptionKey.trim()

        const isKeyValid = validateEncryptionKey(encryptionKey)

        if (isKeyValid) {
            setMultiple([
                { action: setEncryptionKey, payload: encryptionKey },
                { action: setActivePage, payload: PAGES.DASHBOARD },
            ])

            //
        } else {
            setInputsForcefully({ ...inputs, encryptionKey: '' })
            setIsEncryptionKeyInValid(true)
        }
    }

    return (
        <Box position="fixed" top="0" left="0" width="100%" height="100%">
            <Box
                position="fixed"
                top="50%"
                width="100%"
                left="0"
                transform="translateY(-50%)"
            >
                <Container centerContent>
                    <Stack width="90%" spacing={4}>
                        <FormControl isInvalid={isEncryptionKeyInValid}>
                            <CustomInput
                                placeholder="Enter Encryption Key"
                                type="password"
                                onChange={setInput}
                                value={inputs.encryptionKey}
                                name="encryptionKey"
                                onFocus={() => setIsEncryptionKeyInValid(false)}
                            />
                            <FormErrorMessage marginLeft="3px">
                                Invalid Encryption Key!
                            </FormErrorMessage>
                        </FormControl>
                        <CustomButton onClick={onSubmit}>Continue</CustomButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}
