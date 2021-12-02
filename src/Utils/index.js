export async function copyToClipboard(str) {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(str)
            return true
        } catch {
            return false
        }
    }
    return false
}
