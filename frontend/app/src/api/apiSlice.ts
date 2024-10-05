import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces
import { NodeData } from "../components/InteractiveMap/interfaces";
import { AccountData, AutomationData, GroupData } from "../pages/layouts/automations/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: builder => ({
        // Automations
        deleteAutomation: builder.mutation<void, string>({
            query: (automationId) => ({
                url: `/automations/${automationId}/`,
                method: "DELETE"
            })
        }),
        getAutomations: builder.query<AutomationData[], void>({
            query: () => ({
                url: '/automations',
                credentials: 'include'
            })
        }),
        getAutomation: builder.query<AutomationData, string>({
            query: (automationId) => `/automations/${automationId}`
        }),
        getAutomationNodes: builder.query<NodeData[], string>({
            query: (automationId) => `/nodes?automation=${automationId}`
        }),
        updateAutomation: builder.mutation<void, AutomationData>({
            query: (automation) => ({
                url: '/automations/',
                method: "PUT",
                body: automation
            })
        }),

        // Nodes
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
        }),
        updateNode: builder.mutation<void, NodeData>({
            query: (node) => ({
                url: `/nodes/${node.id}`,
                method: "PUT",
                body: node
            })
        }),

        // Groups
        createAutomationGroup: builder.mutation<void, GroupData>({
            query: (automation) => ({
                url: `/automation-groups/`,
                method: "POST",
                body: automation
            })
        }),
        deleteAutomationGroup: builder.mutation<void, string>({
            query: (groupId) => ({
                url: `/automation-groups/${groupId}`,
                method: "DELETE"
            })
        }),
        getAutomationGroups: builder.query<GroupData[], void>({
            query: () => `/automation-groups`
        }),
        updateAutomationGroup: builder.mutation<void, GroupData>({
            query: (group) => ({
                url: `/automation-groups/${group.id}`,
                method: "PUT",
                body: group
            })
        }),
        
        // Accounts
        getAccounts: builder.query<AccountData[], void>({
            query: () => `/accounts`
        }),
    })
});

export const {
    useCreateAutomationGroupMutation,
    useCreateNodeMutation,
    useDeleteAutomationMutation,
    useDeleteNodeMutation,
    useDeleteAutomationGroupMutation,
    useGetAccountsQuery,
    useGetAutomationsQuery,
    useGetAutomationQuery,
    useGetAutomationGroupsQuery,
    useGetAutomationNodesQuery,
    useUpdateNodeMutation,
    useUpdateAutomationMutation,
    useUpdateAutomationGroupMutation
} = apiSlice;