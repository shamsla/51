import { useContext, useState } from 'react'
import { Box, FormControl, FormErrorMessage, Stack } from '@chakra-ui/react'
import { PAGES } from 'Constants'
import { AppContext } from 'Context'
import useForm from 'Hooks/useForm'
import { validateEncryptionKey } from 'Utils/encrytion'
import CustomInput from 'Components/Styled/CustomInput'
import CustomButton from 'Components/Styled/CustomButton'

export default function Credentials() {
    const [inputs, setInput, setInputsForcefully] = useForm({
        encryptionKey: '',
    })
    const [isEncryptionKeyInValid, setIsEncryptionKeyInValid] = useState(false)
    const {
        actions: { setEncryptionKey, setActivePage },
    } = useContext(AppContext)

    const onSubmit = () => {
        const encryptionKey = inputs.encryptionKey.trim()

        const isKeyValid = validateEncryptionKey(encryptionKey)

        if (isKeyValid) {
            setEncryptionKey(encryptionKey)
            setActivePage(PAGES.DASHBOARD)
        } else {
            setInputsForcefully({ ...inputs, encryptionKey: '' })
            setIsEncryptionKeyInValid(true)
        }
    }

    return (
        <Box>
            <Stack spacing={4}>
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
                        Invalid Encryption Key
                    </FormErrorMessage>
                </FormControl>
                <CustomButton onClick={onSubmit}>Get to 51</CustomButton>
            </Stack>
        </Box>
    )
}
