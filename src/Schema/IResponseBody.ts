import ITrade from "./ITrade";

interface Product {
    productId: string;
    name: string;
    description: string;
    price: number;
    trades?: Array<ITrade>;
}

interface User {
    userId: string;
    name: string;
    phoneNumber: string;
}

export default interface IResponseBody {
    statusCode: number;
    message: string;
    user?: User;
    token?: string;
    product?: Product;
    products?: Array<Product>;
}
