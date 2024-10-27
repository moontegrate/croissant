import { MessageCardData } from "../FlowCards/MessageCard/interfaces";
import { ActionCardData } from "../FlowCards/ActionCard/interfaces";
import { NoteCardData } from "../FlowCards/NoteCard/interfaces";
import { ConditionCardData } from "../FlowCards/ConditionCard/interfaces";

export interface NodeData {
    id: string;
    automation: string,
    type: string;
    x: number;
    y: number;
    zIndex: number;
    isEntryPoint: boolean;
    isBinded: boolean;
    bindedTo: number | null;
};

export type NodeType = MessageCardData | ConditionCardData | ActionCardData | NoteCardData

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
    blockCardClick: boolean,
    dragId?: string,
    scale: number,
    automationId: string,
    automationName: string,
    nodes: NodeType[],
    arrows: ArrowData[]
};

export interface CardProps {
    node: NodeData
};