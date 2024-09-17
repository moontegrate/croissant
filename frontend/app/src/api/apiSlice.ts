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
        getNodes: builder.query<NodeData[], string>({
            query: (automation) => `/automations/${automation}/nodes`
        }),
        updateNode: builder.mutation<void, {automation: string, node: NodeData}>({
            query: ({automation, node}) => ({
                url: `/automations/${automation}/nodes/${node.id}`,
                method: "PUT",
                body: node,
            })
        }),
        createNode: builder.mutation<void, {automation: string, node: NodeData}>({
            query: ({automation, node}) => ({
                url: `/automations/${automation}/nodes/`,
                method: "POST",
                body: node,
            })
        }),
        deleteNode: builder.mutation<void, {automation: string, nodeId: string}>({
            query: ({automation, nodeId}) => ({
                url: `/automations/${automation}/nodes/${nodeId}`,
                method: "DELETE"
            })
        })
    })
});

export const { useDeleteNodeMutation, useGetAutomationsQuery, useGetNodesQuery, useUpdateNodeMutation, useCreateNodeMutation } = apiSlice;