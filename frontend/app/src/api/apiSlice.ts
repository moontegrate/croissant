import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NodeData } from "../components/InteractiveMap/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
    endpoints: builder => ({
        getNodes: builder.query<NodeData[],void>({
            query: () => "/nodes"
        }),
        updateNode: builder.mutation<void, NodeData>({
            query: (node) => ({
                url: `/nodes/${node.id}`,
                method: "PUT",
                body: node,
            })
        })
    })
});

export const { useGetNodesQuery, useUpdateNodeMutation } = apiSlice;