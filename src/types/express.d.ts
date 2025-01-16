interface AdditionalUserInfo {
    [key: string]: string | number | boolean | undefined;
}

declare namespace Express {
    interface Request {
        user?: {
            uid: string;
            email?: string;
            additionalInfo?: AdditionalUserInfo;
        };
    }
}
