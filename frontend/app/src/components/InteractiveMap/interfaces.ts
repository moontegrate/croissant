import { MouseEventHandler } from "react";

export enum NodeTypes { Action, Message, Condition, Note }

export interface NodeData {
    id: number;
    type: NodeTypes;
    x: number;
    y: number;
    zIndex: number
}

export interface InitialState {
    isDragging: boolean,
    dragId?: number,
    scale: number,
    nodes: NodeData[]
};

export interface CardProps {
    onMouseDown: MouseEventHandler<HTMLDivElement>,
    onMouseUp: MouseEventHandler<HTMLDivElement>
}