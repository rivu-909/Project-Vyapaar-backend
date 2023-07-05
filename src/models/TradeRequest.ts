import { Schema, model } from "mongoose";
import ITradeRequest from "../Schema/ITradeRequest";

const TradeRequestSchema = new Schema<ITradeRequest>(
    {
        senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        senderName: { type: String, required: true },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverName: { type: String, required: true },
        status: { type: String, required: true },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        tradeId: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

const TradeRequest = model<ITradeRequest>("TradeRequest", TradeRequestSchema);

export default TradeRequest;
