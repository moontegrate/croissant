import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces
import { ResponseData } from "../components/SignInForm/interfaces";

export const authenticationSlice = createApi({
    reducerPath: "authentication",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/"}),
    endpoints: builder => ({
        // Authentication
        signIn: builder.mutation<ResponseData, {email: string, password: string}>({
            query: (data) => ({
                url: `/o/token/`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'password',
                    username: data.email,
                    password: data.password,
                    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID!,
                    client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET!
                })
            })
        }),
        refreshToken: builder.mutation<ResponseData, string>({
            query: (token) => ({
                url: `/o/token/`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: token,
                    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID!,
                    client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET!
                })
            })
        })
    })
});

export const {
    useRefreshTokenMutation,
    useSignInMutation
} = authenticationSlice;