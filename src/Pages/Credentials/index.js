import { useContext, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { PAGES } from 'Constants'
import { AppContext } from 'Context'
import useForm from 'Hooks/useForm'
import { validateEncryptionKey } from 'Utils/encrytion'

export default function Credentials() {
    const toast = useToast()
    const toastId = 'credentials-toast'

    const [inputs, setInput, setInputsForcefully] = useForm({
        firstEk: '',
        secondEk: '',
    })
    const [isFirstEkValid, setIsFirstEkValid] = useState(true)
    const [isSecondEkValid, setIsSecondEkValid] = useState(true)

    const {
        actions: { setEncryptionKeys, setActivePage },
    } = useContext(AppContext)

    const onSubmit = () => {
        const encryptionKeys = {
            first: inputs.firstEk.trim(),
            second: inputs.secondEk.trim(),
        }

        const validatedFirstEk = validateEncryptionKey(encryptionKeys.first)
        const validatedSecondEk = validateEncryptionKey(encryptionKeys.second)

        if (validatedFirstEk && validatedSecondEk) {
            if (
                encryptionKeys.first === encryptionKeys.second &&
                !toast.isActive(toastId)
            ) {
                toast({
                    id: toastId,
                    title: 'Warning',
                    description: 'Encryption keys must not be same.',
                    status: 'error',
                    duration: 3000,
                    isClosable: false,
                    position: 'top',
                })

                return
            }

            setEncryptionKeys(encryptionKeys)
            setActivePage(PAGES.DASHBOARD)
        } else {
            const inputsToReset = {}

            if (!validatedFirstEk) {
                inputsToReset.firstEk = ''
                setIsFirstEkValid(false)
            }
            if (!validatedSecondEk) {
                inputsToReset.secondEk = ''
                setIsSecondEkValid(false)
            }

            // resets(empty) the input fields
            setInputsForcefully({ ...inputs, ...inputsToReset })
        }
    }

    return (
        <Box>
            <Stack spacing={5}>
                <FormControl isInvalid={!isFirstEkValid}>
                    <Input
                        fontSize={17}
                        placeholder="Enter First E-Key"
                        size="lg"
                        type="password"
                        onChange={setInput}
                        value={inputs.firstEk}
                        name="firstEk"
                        onFocus={() => setIsFirstEkValid(true)}
                    />
                    <FormErrorMessage marginLeft="3px">
                        Invalid Encryption Key
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isSecondEkValid}>
                    <Input
                        fontSize={17}
                        placeholder="Enter Second E-Key"
                        size="lg"
                        type="password"
                        onChange={setInput}
                        value={inputs.secondEk}
                        name="secondEk"
                        onFocus={() => setIsSecondEkValid(true)}
                    />
                    <FormErrorMessage marginLeft="3px">
                        Invalid Encryption Key
                    </FormErrorMessage>
                </FormControl>
                <Button
                    variant="solid"
                    colorScheme="blue"
                    size="lg"
                    onClick={onSubmit}
                >
                    Continue
                </Button>
            </Stack>
        </Box>
    )
}
