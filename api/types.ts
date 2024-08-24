export interface OneNews {
    id: string;
    title: string;
    description: string;
    image: string | null;
    created_at: string;
}

export type OneNewsType = Omit<OneNews, 'id'>;

export interface Comment {
    id: string;
    oneNews_id: string;
    author: string | null;
    description: string;
}

export type CommentType = Omit<Comment, 'id'>;

