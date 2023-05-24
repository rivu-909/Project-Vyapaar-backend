interface IError extends Error {
    statusCode?: number;
    data?: any;
}

export default IError;
