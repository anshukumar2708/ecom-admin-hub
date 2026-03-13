const mediaMainUrl = import.meta.env.VITE_MEDIA_BASE_URL;

export const mediaUrl = (fileKey) => {
    return `${mediaMainUrl}/${fileKey}`
}