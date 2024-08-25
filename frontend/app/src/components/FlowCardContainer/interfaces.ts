import { MouseEventHandler } from "react";

export interface CardContainerProps {
    children: JSX.Element,
    stageRef: React.MutableRefObject<any>,
    isEntryPoint: boolean,
    onMouseDown: MouseEventHandler<HTMLDivElement>,
    onMouseUp: MouseEventHandler<HTMLDivElement>
};