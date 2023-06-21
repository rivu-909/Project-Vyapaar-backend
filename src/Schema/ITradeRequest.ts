import { Types } from "mongoose";
import RequestStatus from "./RequestStatus";

export default interface ITradeRequest {
    _id: Types.ObjectId;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    status: RequestStatus;
    productId: Types.ObjectId;
    tradeId: Types.ObjectId;
}
