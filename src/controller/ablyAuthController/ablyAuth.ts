import Ably from "ably";
import { RequestHandler } from "express";
import { ablyApiKey } from "../../constants";
import IRequest from "../../Schema/IRequest";
import createError from "../../utils/createError";

const rest = new Ably.Rest(ablyApiKey);

const ablyAuth: RequestHandler = (req, res, next) => {
    const tokenParams = {
        clientId: (req as IRequest).user.userId,
    };
    rest.auth.createTokenRequest(
        tokenParams,
        (
            err: Ably.Types.ErrorInfo | null,
            tokenRequest: Ably.Types.TokenRequest | undefined
        ) => {
            if (err) {
                const newError = createError((err as Error).message, 500);
                next(newError);
            } else {
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(tokenRequest));
            }
        }
    );
};

export default ablyAuth;
