import { Box, IconButton, Text, useToast } from '@chakra-ui/react'
import CustomButton from 'Components/Styled/CustomButton'
import CustomInput from 'Components/Styled/CustomInput'
import { useContext, useState } from 'react'

import { Copy, Eye } from 'react-feather'
import RenderBullets from 'Components/Common/RenderBullets'
import { copyToClipboard } from 'Utils'
import useForm from 'Hooks/useForm'
import { decryptPassword } from 'Utils/encrytion'
import { AppContext } from 'Context'

export default function RetrievePassword() {
    const [password, setPassword] = useState(null)
    const [inputs, setInput, setInputDirect] = useForm({
        encryptedPassword: '',
    })
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    const showToast = useToast()

    const {
        state: { encryptionKey },
    } = useContext(AppContext)

    const togglePasswordVisibility = () => setPasswordHidden(!isPasswordHidden)
    const handleRevealClick = async () => {
        const encryptedPassword = inputs.encryptedPassword
        if (!encryptedPassword.trim().length)
            return showToast({
                position: 'top',
                title: 'Please enter Encrypted Password.',
                status: 'error',
                duration: 1500,
                isClosable: false,
            })

        const decrypted = await decryptPassword(
            encryptedPassword,
            encryptionKey
        )

        if (decrypted.length) {
            setPassword(decrypted)
            setInputDirect({ ...inputs, encryptedPassword: '' })
        } else
            showToast({
                position: 'top',
                title: 'Oops! Invalid Encrypted Password.',
                status: 'error',
                duration: 1500,
                isClosable: false,
            })
    }

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

    return (
        <Box>
            <Text
                pl="1"
                mb="3"
                fontWeight="medium"
                textAlign="start"
                color="gray.600"
            >
                Password
            </Text>

            <CustomInput
                name="encryptedPassword"
                value={inputs.encryptedPassword}
                onChange={setInput}
                placeholder="Enter encrypted password"
                type="password"
                mb="5"
            />
            <CustomButton mb="2" onClick={handleRevealClick} width="100%">
                Reveal
            </CustomButton>

            {password && (
                <>
                    <Text
                        pl="1"
                        mb="3"
                        mt="10"
                        color="gray.600"
                        fontWeight="medium"
                        textAlign="start"
                    >
                        Decrypted Password
                    </Text>
                    <Box
                        borderColor="gray.300"
                        borderWidth="1px"
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
                </>
            )}
        </Box>
    )
}
