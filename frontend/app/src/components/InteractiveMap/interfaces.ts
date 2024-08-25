export interface NodeData {
    id: number;
    type: string;
    x: number;
    y: number;
    zIndex: number;
    isEntryPoint: boolean;
    noteContent?: string;
}

export interface InitialState {
    isDragging: boolean,
    dragId?: number,
    scale: number,
    nodes: NodeData[]
};

export interface CardProps {
    content?: string
}