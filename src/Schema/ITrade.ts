import { Types } from "mongoose";

export interface Address {
    firstLine: string;
    secondLine?: string;
    district: string;
    state: string;
    pincode: number;
}

export enum TradeType {
    bid = "BID",
    ask = "ASK",
}

export default interface ITrade {
    userId: Types.ObjectId;
    price: number;
    quantity: string;
    type: TradeType;
    address: Address;
}
