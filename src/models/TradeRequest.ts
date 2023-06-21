import { Schema, model } from "mongoose";
import ITradeRequest from "../Schema/ITradeRequest";

const TradeRequestSchema = new Schema<ITradeRequest>({
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    tradeId: { type: Schema.Types.ObjectId, required: true },
});

const TradeRequest = model<ITradeRequest>("TradeRequest", TradeRequestSchema);

export default TradeRequest;
