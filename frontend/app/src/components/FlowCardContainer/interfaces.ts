import { MouseEventHandler } from "react";
import { NodeData } from "../InteractiveMap/interfaces";

export interface CardContainerProps {
    children: JSX.Element,
    node: NodeData,
    canBeEntryPoint: boolean,
    stageRef: React.MutableRefObject<any>,
    onMouseDown: MouseEventHandler<HTMLDivElement>,
    onMouseUp: MouseEventHandler<HTMLDivElement>
};