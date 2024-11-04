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
                    client_id: 'Vc8lBEb1JeW309UrjgUPMLwF4CssK8CNzmllTc38',
                    client_secret: 'je09W8e9GZiN2LLxhUW95omm1od48uacJ5kng7QvLyRMp7nqETGMk4wazntZGcAgy3zFugoULRcfsUXHnZ11nKZsYmARnR4kjLgLo6H4LW7ejBtUiSGwTJId2pImo846'
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
                    client_id: 'Vc8lBEb1JeW309UrjgUPMLwF4CssK8CNzmllTc38',
                    client_secret: 'je09W8e9GZiN2LLxhUW95omm1od48uacJ5kng7QvLyRMp7nqETGMk4wazntZGcAgy3zFugoULRcfsUXHnZ11nKZsYmARnR4kjLgLo6H4LW7ejBtUiSGwTJId2pImo846'
                })
            })
        })
    })
});

export const {
    useRefreshTokenMutation,
    useSignInMutation
} = authenticationSlice;