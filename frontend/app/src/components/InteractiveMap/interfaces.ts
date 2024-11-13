// Interfaces & types
import { NodeType } from "../FlowCards/__base/interfaces";
import { NodeData } from "../FlowCards/__base/interfaces";
import { MessageCardData } from "../FlowCards/MessageCard/interfaces";

export interface ArrowData {
    id: string;
    from: string;
    to: string;
    x?: number;
    y?: number;
};

export interface InitialState {
    isDragging: boolean,
    isBinding: boolean,
    bindingFrom: string | null,
    isAddModal: boolean,
    isTextEditModal: boolean,
    textEditingNode: MessageCardData | null;
    scale: number,
    automationId: string,
    automationName: string,
    nodes: NodeType[],
};

export interface CardProps {
    node: NodeData
};