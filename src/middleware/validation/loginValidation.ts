import { body } from "express-validator";

const loginValidation = [
    body("phoneNumber").trim().isMobilePhone("en-IN"),
    body("password").trim(),
];

export default loginValidation;
