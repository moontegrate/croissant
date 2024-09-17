import { NodeData } from "../../../components/InteractiveMap/interfaces"

export interface AutomationData {
    id: string,
    name: string,
    account: string,
    users: string,
    conversion: string,
    nodes: NodeData[]
};

export interface InitialState {
    automations: AutomationData[]
};