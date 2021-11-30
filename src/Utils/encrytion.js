export const validateEncryptionKey = key => {
    const keySizeInBytes = new Blob([key]).size

    if (keySizeInBytes !== 32) return false

    return true
}
