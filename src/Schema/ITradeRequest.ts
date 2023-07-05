import { Types } from "mongoose";
import RequestStatus from "./RequestStatus";

export default interface ITradeRequest {
    _id: Types.ObjectId;
    senderId: Types.ObjectId;
    senderName: string;
    receiverId: Types.ObjectId;
    receiverName: string;
    status: RequestStatus;
    productId: Types.ObjectId;
    tradeId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
