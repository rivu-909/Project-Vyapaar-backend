import { Types } from "mongoose";

export default interface UserSharableInfo {
    _id: Types.ObjectId;
    phoneNumber: string;
    name: string;
}
