import { Types } from "mongoose";
import IAddress from "./IAddress";

interface IProduct {
    category: string;
    quantity: string;
    price: number;
    address: IAddress;
    description: string;
    userId: Types.ObjectId;
}

export default IProduct;
