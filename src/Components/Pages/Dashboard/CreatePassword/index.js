import { Box, IconButton, Spinner, Text, useToast } from '@chakra-ui/react'
import CustomButton from 'Components/Styled/CustomButton'
import { AppContext } from 'Context'
import { useContext, useEffect, useState } from 'react'
import { encryptPassword, generatePassword } from 'Utils/encrytion'

import { copyToClipboard } from 'Utils'

import { Copy, Eye } from 'react-feather'
import RenderBullets from 'Components/Common/RenderBullets'

export default function CreatePassword() {
    const [password, setPassword] = useState('')
    const [encrypted, setEncrypted] = useState('')

    const [isPasswordHidden, setPasswordHidden] = useState(true)
    const [spinnerStatus, setSpinnerStatus] = useState(true)

    const showToast = useToast()

    const {
        state: { encryptionKey },
    } = useContext(AppContext)

    const populatePasswords = () => {
        setEncrypted('')

        //
        const plainPassword = generatePassword()
        setPassword(plainPassword)

        //
        encryptPassword(plainPassword, encryptionKey).then(result =>
            setEncrypted(result)
        )
    }

    useEffect(() => populatePasswords(), [])
    useEffect(() => {
        const timeout = setTimeout(() => setSpinnerStatus(false), 1000)
        return () => clearTimeout(timeout)
    })

    const togglePasswordVisibility = () => setPasswordHidden(!isPasswordHidden)
    const copyPassword = async text => {
        const isTextCopied = await copyToClipboard(text)

        if (isTextCopied)
            showToast({
                position: 'top',
                title: 'Password Copied',
                status: 'success',
                duration: 1500,
                isClosable: false,
            })
        else
            showToast({
                position: 'top',
                title: 'Oops! Unable to copy password.',
                status: 'error',
                duration: 1500,
                isClosable: false,
            })
    }

    if (spinnerStatus)
        return (
            <Box
                height="200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner size="xl" />
            </Box>
        )

    return (
        <Box display="flex" flexDir="column" alignItems="flex-start">
            <Text pl="1" mb="3" fontWeight="medium" color="gray.600">
                Password
            </Text>

            <Box
                display="flex"
                width="100%"
                borderRadius="lg"
                bg="gray.200"
                justifyContent="space-between"
                alignItems="center"
                padding={4}
                mb="10"
            >
                <Text
                    whiteSpace="pre-wrap"
                    style={{ wordWrap: 'break-word' }}
                    textAlign="start"
                    width="100%"
                    color="gray.600"
                    fontSize="15px"
                >
                    {isPasswordHidden ? <RenderBullets /> : password}
                </Text>
                <Box display="flex" alignItems="center">
                    <IconButton
                        onClick={togglePasswordVisibility}
                        background="none"
                        size="sm"
                    >
                        <Eye width="16px" color="#4A5568" />
                    </IconButton>
                    <IconButton
                        onClick={copyPassword.bind(null, password)}
                        background="none"
                        size="sm"
                    >
                        <Copy color="#4A5568" width="16px" />
                    </IconButton>
                </Box>
            </Box>

            <Box mb="3" display="flex" alignItems="flex-end" width="100%">
                <Text fontWeight="medium" pl="1" color="gray.600">
                    Encrypted Password
                </Text>
                <IconButton
                    onClick={copyPassword.bind(null, encrypted)}
                    background="none"
                    size="sm"
                    ml="auto"
                    mr="14px"
                    style={{ marginBottom: '-6px' }}
                >
                    <Copy color="#4A5568" width="16px" />
                </IconButton>
            </Box>

            <Box
                display="flex"
                width="100%"
                borderRadius="lg"
                bg="gray.200"
                padding={4}
                mb="10"
            >
                <Text
                    whiteSpace="pre-wrap"
                    style={{ wordWrap: 'break-word' }}
                    textAlign="start"
                    width="100%"
                    color="gray.600"
                    fontSize="15px"
                >
                    {encrypted}
                </Text>
            </Box>
            <CustomButton width="100%" onClick={populatePasswords}>
                Recreate
            </CustomButton>
        </Box>
    )
}
