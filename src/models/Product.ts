import { Schema, model } from "mongoose";
import IProduct from "../Schema/IProduct";
import ITrade from "../Schema/ITrade";

const tradeSchema = new Schema<ITrade>({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    price: { type: Number, require: true },
    quantity: { type: String, require: true },
    type: { type: String, require: true },
    address: {
        firstLine: { type: String, required: true },
        secondLine: { type: String },
        district: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
});

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, require: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trades: { type: [tradeSchema], required: true },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
