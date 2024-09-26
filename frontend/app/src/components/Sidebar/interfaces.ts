import { ReactNode, MouseEvent } from "react";

export interface SidebarProps {
    children?: ReactNode,
    title: string,
};

export interface SidebarGroupProps {
    children?: ReactNode,
    title?: string,
    addButton?: ReactNode
};

export interface SidebarItemProps {
    children?: ReactNode,
    icon?: ReactNode,
    focused?: boolean,
    onClick?: () => void,
    onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void,
    onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void,
    dropdown?: ReactNode
};