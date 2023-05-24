import { body } from "express-validator";
import User from "../../models/User";

const signUpValidation = [
    body("phoneNumber")
        .trim()
        .isMobilePhone("en-IN")
        .custom(async (value) => {
            const user = await User.findOne({ phoneNumber: value });
            if (user) {
                return Promise.reject("Phone Number already in use");
            }
        }),
    body("name").trim().isLength({ min: 3 }).isAlphanumeric("en-IN"),
    body("password")
        .trim()
        .isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
        })
        .withMessage(
            "A strong password should contain:\n 1. min 6 characters\n 2. min 1 numeric character\n 3. min 1 uppercase\n 4. min 1 symbol"
        ),
];

export default signUpValidation;
