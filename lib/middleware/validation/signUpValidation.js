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
const User_1 = __importDefault(require("../../models/User"));
const signUpValidation = [
    (0, express_validator_1.body)("phoneNumber")
        .trim()
        .isMobilePhone("en-IN")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ phoneNumber: value });
        if (user) {
            return Promise.reject("Phone Number already in use");
        }
    })),
    (0, express_validator_1.body)("name").trim().isLength({ min: 3 }).isAlphanumeric("en-IN"),
    (0, express_validator_1.body)("password")
        .trim()
        .isStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
        .withMessage("A strong password should contain:\n 1. min 6 characters\n 2. min 1 numeric character\n 3. min 1 uppercase\n 4. min 1 symbol"),
];
exports.default = signUpValidation;
