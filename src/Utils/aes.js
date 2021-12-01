import crypto from 'crypto-js'

export function aesEncrypt(text, encryptionKey) {
    const iv = crypto.lib.WordArray.random(16)

    const cipher = crypto.AES.encrypt(text, encryptionKey, {
        iv: iv,
        padding: crypto.pad.Pkcs7,
        mode: crypto.mode.CBC,
    })

    return `${cipher.toString()}${iv.toString()}`
}

export function aesDecrypt(text, encryptionKey) {
    const ivLength = 32
    const ivStartPosition = text.length - ivLength

    const iv = text.substr(ivStartPosition)
    const encrypted = text.substr(0, ivStartPosition)

    var decrypted = crypto.AES.decrypt(encrypted, encryptionKey, {
        iv: iv,
        padding: crypto.pad.Pkcs7,
        mode: crypto.mode.CBC,
    })

    return decrypted.toString(crypto.enc.Utf8)
}
