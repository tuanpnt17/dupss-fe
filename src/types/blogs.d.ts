export interface IBlog {
    id: string
    title: string
    content: string
    description: string
    authorId: string
    createdAt: string
    authorName: string
}

export interface IBlogCreate {
    title: string
    content: string
    description: string
    authorId: string
}