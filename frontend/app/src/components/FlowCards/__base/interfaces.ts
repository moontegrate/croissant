// Interfaces
import { KonvaEventObject } from "konva/lib/Node"
import { ActionCardData } from "../ActionCard/interfaces";
import { ConditionCardData } from "../ConditionCard/interfaces";
import { MessageCardData } from "../MessageCard/interfaces";
import { NoteCardData } from "../NoteCard/interfaces";

export interface NodeData {
    id: string,
    automation: string,
    type: string,
    x: number,
    y: number,
    isEntryPoint: boolean,
    isBinded: boolean,
    bindedTo: number | null
};

export type NodeType = MessageCardData | ConditionCardData | ActionCardData | NoteCardData;

export interface CardContainerProps {
    node: NodeData,
    children?: React.ReactNode,
    onClick?: (evt: KonvaEventObject<MouseEvent>) => void
}