import { RequestHandler } from "express";
import NewsArticle from "../../models/NewsArticle";
import IError from "../../Schema/IError";
import newsApiServiceCall from "../../services/newsApiServiceCall";
import createError from "../../utils/createError";

const newsController: RequestHandler = async (req, res, next) => {
    try {
        const articlesCached = await NewsArticle.find();
        const lastCached = articlesCached[0];
        const timeLimit = new Date();
        timeLimit.setHours(timeLimit.getHours() - 2);

        if (!lastCached || lastCached.createdAt <= timeLimit) {
            if (lastCached) {
                await lastCached.deleteOne();
            }
            const articles = await newsApiServiceCall();
            const newsArticle = new NewsArticle({ articles });
            await newsArticle.save();
            return res.send(newsArticle);
        }

        res.send(lastCached);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default newsController;
