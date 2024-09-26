export interface NodeData {
    id: string;
    automation: string,
    type: string;
    x: number;
    y: number;
    zIndex: number;
    isEntryPoint: boolean;
    isBinded: boolean;
    bindedTo: number | null,
    noteContent?: string;
};

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
    blockCardClick: boolean,
    dragId?: string,
    scale: number,
    automationId: string,
    automationName: string,
    nodes: NodeData[],
    arrows: ArrowData[]
};

export interface CardProps {
    node?: NodeData
};