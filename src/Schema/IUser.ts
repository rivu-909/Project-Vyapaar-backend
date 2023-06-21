import { Types } from "mongoose";
import UserType from "./UserType";

export default interface IUser {
    name: string;
    phoneNumber: string;
    password: string;
    gstin: string;
    userType: UserType;
    tradeRequests: {
        sent: Array<Types.ObjectId>;
        received: Array<Types.ObjectId>;
    };
}
