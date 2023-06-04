import UserType from "./UserType";

export default interface IUser {
    name: string;
    phoneNumber: number;
    password: string;
    gstin: string;
    userType: UserType;
}
