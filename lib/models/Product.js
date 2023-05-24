"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: Number, require: true },
    address: {
        firstLine: { type: String, required: true },
        secondLine: { type: String },
        district: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
    description: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
