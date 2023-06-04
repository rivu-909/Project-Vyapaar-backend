import { Types } from "mongoose";
import ITrade from "./ITrade";

export default interface IProduct {
    name: string;
    price: number;
    description: string;
    userId: Types.ObjectId;
    trades: Array<ITrade>;
}
