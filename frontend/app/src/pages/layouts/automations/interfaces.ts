import { NodeData } from "../../../components/InteractiveMap/interfaces"

export interface AutomationData {
    id: string,
    name: string,
    account: string,
    users: string,
    conversion: string,
    enabled: boolean,
    group: string | boolean,
    nodes: NodeData[]
};

export interface InitialState {
    automations: AutomationData[]
};