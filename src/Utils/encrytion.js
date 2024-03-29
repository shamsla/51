import passwordGenerator from 'generate-password'
import { aesDecrypt, aesEncrypt } from './aes'

export const validateEncryptionKey = key => {
    const keySizeInBytes = new Blob([key]).size

    if (keySizeInBytes !== 32) return false

    return true
}

export const generatePassword = (length = 16) => {
    return passwordGenerator.generate({
        length,
        numbers: true,
        symbols: true,
        excludeSimilarCharacters: true,
    })
}

export const encryptPassword = (password, encryptionKey) => {
    return new Promise(resolve => {
        const encrypted = aesEncrypt(password, encryptionKey)
        resolve(encrypted)
    })
}

export const decryptPassword = (encryptedPassword, encryptionKey) => {
    return new Promise(resolve => {
        const decrypted = aesDecrypt(encryptedPassword, encryptionKey)
        resolve(decrypted)
    })
}
