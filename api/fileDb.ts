import {promises as fs} from 'fs';
import {Comment, CommentType, OneNews, OneNewsType} from "./types";

const fileName = './db.json';
let data = {
    news: [] as OneNews[],
    comments: [] as Comment[],
};

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (error) {
            data = {
                news: [],
                comments: []
            };
        }
    },
    async getNews() {
        return data.news.map(oneNews => ({
            id: oneNews.id,
            title: oneNews.title,
            image: oneNews.image,
            created_at: oneNews.created_at,
        }));
    },
    async addOneNews(oneNews: OneNewsType) {
        const id = crypto.randomUUID();
        const created_at = new Date().toISOString();
        const oneNewsData = {id, ...oneNews, created_at};
        data.news.push(oneNewsData);
        await this.save();
        return oneNewsData;
    },
    async getOneNewsById(id: string) {
        const oneNews = data.news.find(oneNews => oneNews.id === id);
        return oneNews || null;
    },
    async deleteOneNews(id: string) {
        data.news = data.news.filter(oneNews => oneNews.id !== id);
        await this.save();
    },
    async getComments(oneNews_id: string) {
        if (oneNews_id) {
            return data.comments.filter(comment => comment.oneNews_id === oneNews_id);
        }
        return [];
    },
    async addComment(comment: CommentType) {
        const id = crypto.randomUUID();
        const commentData = {id, ...comment};
        data.comments.push(commentData);
        await this.save();
        return commentData;
    },
    async deleteComment(id: string) {
        data.comments = data.comments.filter(comment => comment.id !== id);
        await this.save();
    },
    async deleteCommentsOfNews(newsId: string) {
        data.comments = data.comments.filter(comment => comment.oneNews_id !== newsId);
        await this.save();

    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data, null, 2));
    }
};

export default fileDb;