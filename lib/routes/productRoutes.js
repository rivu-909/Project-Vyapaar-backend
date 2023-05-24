"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createProduct_1 = __importDefault(require("../controller/productControllers/createProduct"));
const deleteProduct_1 = __importDefault(require("../controller/productControllers/deleteProduct"));
const getProducts_1 = __importDefault(require("../controller/productControllers/getProducts"));
const updateProduct_1 = __importDefault(require("../controller/productControllers/updateProduct"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const productValidation_1 = __importDefault(require("../middleware/validation/productValidation"));
const router = (0, express_1.Router)();
router.use(isAuth_1.default);
router.get("/all", getProducts_1.default);
router.post("/new", productValidation_1.default, createProduct_1.default);
router.put("/update/:productId", productValidation_1.default, updateProduct_1.default);
router.delete("/delete/:productId", deleteProduct_1.default);
exports.default = router;