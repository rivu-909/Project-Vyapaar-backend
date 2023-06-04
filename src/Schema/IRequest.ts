import { Request } from "express";
import UserType from "./UserType";

interface User {
    userId: string;
    phoneNumber: string;
    name: string;
    userType: UserType;
}

export default interface IRequest extends Request {
    user: User;
}
