import slugify from 'react-slugify';
const mediaMainUrl = import.meta.env.VITE_MEDIA_BASE_URL;

export const mediaUrl = (fileKey: string) => {
    return `${mediaMainUrl}/${fileKey}`
}

export const generateSlug = (text: string) => {
    return slugify(text);
};

