"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Product_1 = __importDefault(require("../../models/Product"));
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const productId = req.params.productId;
        let product = yield Product_1.default.findById(productId);
        if (!product) {
            const error = new Error("Cannot find product");
            error.statusCode = 404;
            throw error;
        }
        if (product.userId.toString() !== req.user.userId) {
            const error = new Error("Not authorized");
            error.statusCode = 403;
            throw error;
        }
        const updatedProduct = req.body;
        product.description = updatedProduct.description;
        product.quantity = updatedProduct.quantity;
        product.price = updatedProduct.price;
        product.address = updatedProduct.address;
        product.category = updatedProduct.category;
        yield product.save();
        res.status(201).json({
            message: "Product updated successfully",
            product,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.default = updateProduct;
