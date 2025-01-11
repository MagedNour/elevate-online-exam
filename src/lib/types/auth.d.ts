

declare type User = {
    _id: string;
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
} & DatabaseFields;


declare type SuccessfulResponse = {
    message: "success";
    token: string;
    user: User;
}


declare type ErrorResponse = {
    message: string;
    code: number;
}


declare type LoginResponse = SuccessfulResponse | ErrorResponse;