import { Schema, model } from "mongoose";

interface INewsArticle {
    sourceName: string | null;
    author: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    urlToImage: string | null;
    publishedAt: string | null;
    content: string | null;
}

interface INewsArticles {
    articles: INewsArticle[];
    createdAt: Date;
}

const newsArticleSchema = new Schema<INewsArticles>({
    articles: {
        type: [
            {
                author: { type: String },
                title: { type: String },
                description: { type: String },
                url: { type: String },
                urlToImage: { type: String },
                publishedAt: { type: String },
                content: { type: String },
            },
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const NewsArticle = model<INewsArticles>("NewsArticle", newsArticleSchema);

export default NewsArticle;
