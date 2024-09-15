export interface NodeData {
    id: number;
    type: string;
    x: number;
    y: number;
    zIndex: number;
    isEntryPoint: boolean;
    isBinded: boolean;
    bindedTo: number | null;
    noteContent?: string;
};

export interface ArrowData {
    id: number;
    from: number;
    to: number;
    x?: number;
    y?: number;
};

export interface InitialState {
    isDragging: boolean,
    isBinding: boolean,
    bindingFrom: number | null,
    isAddModal: boolean,
    blockCardClick: boolean,
    dragId?: number,
    scale: number,
    nodes: NodeData[],
    arrows: ArrowData[]
};

export interface CardProps {
    node?: NodeData
};