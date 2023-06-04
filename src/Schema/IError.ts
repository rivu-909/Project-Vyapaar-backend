interface IErrorResponse {
    description: string;
    statusCode: number;
    data: any;
}

type IError = Error & IErrorResponse;

export default IError;
