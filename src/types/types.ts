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