export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string,
    authorName?: string
}

export interface User {
    id: number,
    name: string,
    postId: number,
}

export interface ImageWithFallback {
    src: string,
    fallback: string,
    alt: "image" | "no picture",
    width: number
}