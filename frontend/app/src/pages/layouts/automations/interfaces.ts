import { NodeData } from "../../../components/InteractiveMap/interfaces"

export interface AutomationData {
    id: string,
    name: string,
    account: string,
    accountName: string,
    users: number,
    conversion: number,
    channel: string,
    enabled: boolean,
    group: string | boolean,
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
    groupsFilter: string | boolean,
    channelsFilter: string,
    statusFilter: string,
    sort: string
};