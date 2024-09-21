import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces
import { NodeData } from "../components/InteractiveMap/interfaces";
import { AutomationData } from "../pages/layouts/automations/interfaces";
import { GroupData } from "../components/AutomationsSidebar/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
    endpoints: builder => ({
        getAutomations: builder.query<AutomationData[], void>({
            query: () => "/automations"
        }),
        getAutomation: builder.query<AutomationData, string>({
            query: (automationId) => `/automations/${automationId}`
        }),
        getAutomationNodes: builder.query<NodeData[], string>({
            query: (automationId) => `/nodes?automation=${automationId}`
        }),
        updateAutomation: builder.mutation<void, AutomationData>({
            query: (automation) => ({
                url: `/automations/${automation.id}`,
                method: "PUT",
                body: automation
            })
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
        }),
        getAutomationGroups: builder.query<GroupData[], void>({
            query: () => `/automation-groups`
        }),
        createAutomationGroup: builder.mutation<void, GroupData>({
            query: (automation) => ({
                url: `/automation-groups/`,
                method: "POST",
                body: automation
            })
        }),
    })
});

export const { useDeleteNodeMutation, useCreateAutomationGroupMutation, useGetAutomationsQuery, useGetAutomationQuery, useGetAutomationGroupsQuery, useGetAutomationNodesQuery, useUpdateNodeMutation, useUpdateAutomationMutation, useCreateNodeMutation } = apiSlice;