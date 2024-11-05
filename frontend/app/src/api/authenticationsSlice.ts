import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces
import { ResponseData } from "../components/SignInForm/interfaces";

const clientId = 'XAS9MzADKPOO8a1ZlmNRoujox7KhZoYtxBrQKGHV';
const clientSecret = 'TslTcmf2WYlpquqpMR1YEDzfh1PYWnBXdN1pKSmmDm6lED7RRvMtUgyZIPqmV1qZItc7h96L87KexoN4ECho6R0EuajKvUIBfvZGvmueuRqyNkh4LIDaMEy21VraeoU8';

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
                    client_id: clientId,
                    client_secret: clientSecret
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
                    client_id: clientId,
                    client_secret: clientSecret
                })
            })
        })
    })
});

export const {
    useRefreshTokenMutation,
    useSignInMutation
} = authenticationSlice;