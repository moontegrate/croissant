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
    isBinding: boolean,
    bindingFrom: number | null,
    isAddModal: boolean,
    blockCardClick: boolean,
    dragId?: number,
    scale: number,
    nodes: NodeData[]
};

export interface CardProps {
    node?: NodeData
}