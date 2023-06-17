import { body } from "express-validator";

const tradeValidation = [
    body("price").trim().notEmpty().isNumeric(),
    body("quantity").trim().notEmpty(),
    body("type").trim().notEmpty(),
    body("address")
        .notEmpty()
        .custom((value) => {
            const { firstLine, district, state, pincode } = value;
            if (
                firstLine.length !== 0 &&
                district.length !== 0 &&
                state.length !== 0 &&
                pincode.length === 6
            ) {
                return true;
            }
            return Promise.reject("Address not valid");
        }),
];

export default tradeValidation;
