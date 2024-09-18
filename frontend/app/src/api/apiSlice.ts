import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces
import { NodeData } from "../components/InteractiveMap/interfaces";
import { AutomationData } from "../pages/layouts/automations/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
    endpoints: builder => ({
        getAutomations: builder.query<AutomationData[], void>({
            query: () => "/automations"
        }),
        getAutomationNodes: builder.query<NodeData[], string>({
            query: (automationId) => `/nodes?automation=${automationId}`
        }),
        updateNode: builder.mutation<void, NodeData>({
            query: (node) => ({
                url: `/nodes/${node.id}`,
                method: "PUT",
                body: node
            })
        }),
        createNode: builder.mutation<void, NodeData>({
            query: (node) => ({
                url: `/nodes/`,
                method: "POST",
                body: node
            })
        }),
        deleteNode: builder.mutation<void, string>({
            query: (nodeId) => ({
                url: `/nodes/${nodeId}`,
                method: "DELETE"
            })
        })
    })
});

export const { useDeleteNodeMutation, useGetAutomationsQuery, useGetAutomationNodesQuery, useUpdateNodeMutation, useCreateNodeMutation } = apiSlice;