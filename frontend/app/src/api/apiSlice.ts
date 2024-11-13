import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces
import { RootState } from "../store";
import { MessageCardData } from "../components/FlowCards/MessageCard/interfaces";
import { ActionCardData } from "../components/FlowCards/ActionCard/interfaces";
import { ConditionCardData } from "../components/FlowCards/ConditionCard/interfaces";
import { NoteCardData } from "../components/FlowCards/NoteCard/interfaces";
import { AccountData, AutomationData, GroupData } from "../pages/layouts/automations/interfaces";
import { NodeType } from "../components/FlowCards/__base/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).appSlice.accessToken;

            if (accessToken) headers.set('Authorization', 'Bearer ' + accessToken);

            return headers;
        }
    }),
    endpoints: builder => ({
        // Automations
        createAutomation: builder.mutation<void, {automationName: string, selectedAccount: AccountData}>({
            query: (data) => ({
                url: `/automations/`,
                method: "POST",
                body: data
            })
        }),
        deleteAutomation: builder.mutation<void, string>({
            query: (automationId) => ({
                url: `/automations/${automationId}/`,
                method: "DELETE"
            })
        }),
        getAutomations: builder.query<AutomationData[], void>({
            query: () => '/automations'
        }),
        getAutomation: builder.query<AutomationData, string>({
            query: (automationId) => `/automations/${automationId}/`
        }),
        getAutomationNodes: builder.query<NodeType[], string>({
            query: (automationId) => `/nodes?automation=${automationId}`
        }),
        updateAutomation: builder.mutation<void, AutomationData>({
            query: (automation) => ({
                url: `/automations/${automation.id}/`,
                method: "PUT",
                body: automation
            })
        }),

        // Nodes
        createNode: builder.mutation<void, MessageCardData | ConditionCardData | ActionCardData | NoteCardData>({
            query: (node) => ({
                url: `/nodes/`,
                method: "POST",
                body: node
            })
        }),
        deleteNode: builder.mutation<void, string>({
            query: (nodeId) => ({
                url: `/nodes/${nodeId}/`,
                method: "DELETE"
            })
        }),
        updateNode: builder.mutation<void, MessageCardData | ConditionCardData | ActionCardData | NoteCardData>({
            query: (node) => ({
                url: `/nodes/${node.id}/`,
                method: "PUT",
                body: {...node, x: Math.round(node.x), y: Math.round(node.y)}
            })
        }),

        // Groups
        createAutomationGroup: builder.mutation<void, GroupData>({
            query: (group) => ({
                url: `/automations-groups/`,
                method: "POST",
                body: group
            })
        }),
        deleteAutomationGroup: builder.mutation<void, string>({
            query: (groupId) => ({
                url: `/automations-groups/${groupId}/`,
                method: "DELETE"
            })
        }),
        getAutomationGroups: builder.query<GroupData[], void>({
            query: () => `/automations-groups`
        }),
        updateAutomationGroup: builder.mutation<void, GroupData>({
            query: (group) => ({
                url: `/automations-groups/${group.id}/`,
                method: "PUT",
                body: group
            })
        }),
        
        // Accounts
        getAccounts: builder.query<AccountData[], void>({
            query: () => `/accounts`
        }),

        // Authentication
        signIn: builder.mutation<void, {email: string, password: string}>({
            query: (data) => ({
                url: `/o/token/`,
                method: "POST",
                body: data
            })
        })
    })
});

export const {
    useCreateAutomationMutation,
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
    useUpdateAutomationGroupMutation,
} = apiSlice;