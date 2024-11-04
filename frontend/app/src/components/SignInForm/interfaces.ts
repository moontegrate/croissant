export interface ResponseData {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string
};

export interface SignInError {
    data: {
        error: string,
        error_description: string
    },
    status: number
};