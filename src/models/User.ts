import { Schema, model, Types } from "mongoose";
import IUser from "../Schema/IUser";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    gstin: { type: String, required: true },
    userType: { type: String, required: true },
    connections: {
        type: [
            {
                _id: { type: Schema.Types.ObjectId, required: true },
                phoneNumber: { type: String, required: true },
                name: { type: String, required: true },
            },
        ],
        default: [],
    },
    tradeRequests: {
        type: {
            sent: [
                {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "TradeRequest",
                },
            ],
            received: [
                {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "TradeRequest",
                },
            ],
        },
        _id: false,
        default: {
            sent: [],
            received: [],
        },
    },
});

const User = model<IUser>("User", userSchema);

export default User;
