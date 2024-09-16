import { MouseEventHandler } from "react";

export interface CardContainerProps {
    children: JSX.Element,
    id: string,
    stageRef: React.MutableRefObject<any>,
    canBeEntryPoint: boolean,
    isEntryPoint: boolean,
    onMouseDown: MouseEventHandler<HTMLDivElement>,
    onMouseUp: MouseEventHandler<HTMLDivElement>
};