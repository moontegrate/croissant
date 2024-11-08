import { NodeData } from "../../../components/InteractiveMap/interfaces"

export interface AutomationData {
    id: string,
    name: string,
    account: string,
    accountName: string,
    accountIcon: string,
    users: number,
    conversion: number,
    channel: string,
    createdDate: string,
    enabled: boolean,
    group: string | null,
    nodes: NodeData[]
};

export interface GroupData {
    id: string,
    name: string
};

export interface AccountData {
    id: string,
    name: string,
    img: string
}

export interface InitialState {
    accounts: AccountData[],
    automations: AutomationData[],
    groups: GroupData[],
    groupsFilter: string | boolean | null,
    channelsFilter: string,
    statusFilter: string,
    sort: string,
    isAutomationAdding: boolean,
    currentModalView: number,
    createAutomationForm: {
        automationName: string | null,
        selectedAccount: AccountData | null
    },
    automationSettingsState: {
        automation: AutomationData
    } | null,
    botLinkData: {
        id: string,
        name: string,
        channel: string,
    } | null
};