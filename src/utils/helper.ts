const mediaMainUrl = import.meta.env.VITE_MEDIA_BASE_URL;

export const mediaUrl = (fileKey) => {
    console.log("${mediaMainUrl}/${fileKey}", `${mediaMainUrl}/${fileKey}`)
    return `${mediaMainUrl}/${fileKey}`
}