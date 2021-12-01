import { Box, IconButton, Spinner, Text } from '@chakra-ui/react'
import CustomButton from 'Components/Styled/CustomButton'
import { AppContext } from 'Context'
import { useContext, useEffect, useState } from 'react'
import { encryptPassword, generatePassword } from 'Utils/encrytion'

export default function CreatePassword() {
    const [password, setPassword] = useState(null)
    const [encrypted, setEncrypted] = useState(null)

    const {
        state: { encryptionKey },
    } = useContext(AppContext)

    const populatePasswords = () => {
        setEncrypted(null)

        //
        const plainPassword = generatePassword()
        setPassword(plainPassword)

        //
        ;(async () => {
            const encryptedPassword = await encryptPassword(
                plainPassword,
                encryptionKey
            )
            setEncrypted(encryptedPassword)
        })()
    }

    useEffect(() => populatePasswords(), [])

    if (!encrypted)
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
            <Text fontWeight="medium" color="gray.400" pl="1" mb="3">
                Password
            </Text>
            <Box
                display="flex"
                width="100%"
                borderRadius="lg"
                bg="gray.900"
                padding={4}
                mb="10"
            >
                <Text
                    whiteSpace="pre-wrap"
                    style={{ wordWrap: 'break-word' }}
                    textAlign="start"
                    width="100%"
                    color="gray.500"
                    fontSize="15px"
                >
                    {password}
                </Text>
            </Box>
            <Text fontWeight="medium" color="gray.400" pl="1" mb="3">
                Encrypted Password
            </Text>
            <Box
                display="flex"
                width="100%"
                borderRadius="lg"
                bg="gray.900"
                padding={4}
                mb="10"
            >
                <Text
                    whiteSpace="pre-wrap"
                    style={{ wordWrap: 'break-word' }}
                    textAlign="start"
                    width="100%"
                    color="gray.500"
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
