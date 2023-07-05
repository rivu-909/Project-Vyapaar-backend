import { Types } from "mongoose";
import UserSharableInfo from "./UserSharableInfo";
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
    connections: Array<UserSharableInfo>;
}
