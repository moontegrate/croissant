import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NodeData } from "../components/InteractiveMap/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
    endpoints: builder => ({
        getNodes: builder.query<NodeData[], void>({
            query: () => "/nodes"
        }),
        updateNode: builder.mutation<void, NodeData>({
            query: (node) => ({
                url: `/nodes/${node.id}`,
                method: "PUT",
                body: node,
            })
        }),
        createNode: builder.mutation<void, NodeData>({
            query: (node) => ({
                url: '/nodes/',
                method: "POST",
                body: node,
            })
        }),
        deleteNode: builder.mutation<void, string>({
            query: (id) => ({
                url: `/nodes/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const { useDeleteNodeMutation, useGetNodesQuery, useUpdateNodeMutation, useCreateNodeMutation } = apiSlice;