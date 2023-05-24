"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function isAlpha(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}
function isNumeric(str) {
    return /^[0-9]+$/.test(str);
}
const productValidation = [
    (0, express_validator_1.body)("category").trim().notEmpty(),
    (0, express_validator_1.body)("quantity").trim().notEmpty(),
    (0, express_validator_1.body)("price").trim().notEmpty().isNumeric(),
    (0, express_validator_1.body)("address").custom((value) => {
        const { firstLine, district, state, pincode } = value;
        if (firstLine.length !== 0 &&
            district.length !== 0 &&
            isAlpha(district) &&
            state.length !== 0 &&
            isAlpha(state) &&
            pincode.length === 6 &&
            isNumeric(pincode)) {
            return true;
        }
        throw new Error("Provide a valid address");
    }),
    (0, express_validator_1.body)("description").trim(),
];
exports.default = productValidation;
