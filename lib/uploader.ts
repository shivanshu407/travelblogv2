import { toast } from 'sonner'

export const uploadImage = async (file: File): Promise<string> => {
    const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
            'content-type': file.type || 'application/octet-stream',
            'x-vercel-filename': file.name || 'image.png'
        },
        body: file
    })

    if (response.status === 200) {
        const { url } = await response.json()
        return url
    } else if (response.status === 401) {
        throw new Error('`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.')
    } else {
        throw new Error('Error uploading image. Please try again.')
    }
}