import { body } from "express-validator";

function isAlpha(str: string) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

function isNumeric(str: string) {
    return /^[0-9]+$/.test(str);
}

const productValidation = [
    body("category").trim().notEmpty(),
    body("quantity").trim().notEmpty(),
    body("price").trim().notEmpty().isNumeric(),
    body("address").custom((value) => {
        const { firstLine, district, state, pincode } = value;
        if (
            firstLine.length !== 0 &&
            district.length !== 0 &&
            isAlpha(district) &&
            state.length !== 0 &&
            isAlpha(state) &&
            pincode.length === 6 &&
            isNumeric(pincode)
        ) {
            return true;
        }
        throw new Error("Provide a valid address");
    }),
    body("description").trim(),
];

export default productValidation;
