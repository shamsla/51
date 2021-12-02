import passwordGenerator from 'generate-password'
import { aesEncrypt } from './aes'

export const validateEncryptionKey = key => {
    const keySizeInBytes = new Blob([key]).size

    if (keySizeInBytes !== 32) return false

    return true
}

export const generatePassword = (length = 16) => {
    return passwordGenerator.generate({
        length,
        numbers: true,
    })
}

export const encryptPassword = (password, encryptionKey) => {
    return new Promise(resolve => {
        const encrypted = aesEncrypt(password, encryptionKey)
        resolve(encrypted)
    })
}
