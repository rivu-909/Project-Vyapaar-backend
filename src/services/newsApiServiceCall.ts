import { RequestHandler } from "express";
import axios from "axios";
import { newsApiKey } from "../constants";
import createError from "../utils/createError";
import IError from "../Schema/IError";

const newsApiUrl =
    "https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=40";

export default async function newsApiServiceCall() {
    try {
        const response = await axios.get(newsApiUrl, {
            headers: {
                "x-api-key": newsApiKey,
            },
        });

        if (response.data.status === "error") {
            throw createError("Fetch news api failed", 500);
        }

        return response.data.articles;
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            throw newError;
        } else {
            throw err;
        }
    }
}
