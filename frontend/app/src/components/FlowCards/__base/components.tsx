// Konva
import { KonvaEventObject } from 'konva/lib/Node';

// Components
import { Circle, Group, Rect, Text } from 'react-konva';

// Interfaces
import { CardContainerProps } from './interfaces';

// Hooks
import { useEffect, useRef, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { setNodes } from '../../InteractiveMap/interactiveMapSlice';

// Server
import { useGetAutomationNodesQuery, useUpdateNodeMutation } from '../../../api/apiSlice';

export const defaultBackgroundWidth = 350;
export const defaultBackgroundHeight = 110;

export const CardContainer: React.FC<CardContainerProps> = ({node, children, onClick}) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.appSlice.theme);

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [backgroundHeight, setBackgroundHeight] = useState(node.type !== "Note" ? defaultBackgroundHeight : 30 );

    // Server
    const [updateNode] = useUpdateNodeMutation();
    const {refetch} = useGetAutomationNodesQuery(node.automation);

    // Connect circle variables
    const [isConnectHovered, setIsConnectHovered] = useState<boolean>(false);

    const groupRef = useRef<any>(null);

    const getAccentColor = (type: string) => {
        switch (type) {
            case "Message":
                return theme.colors.flowCardsAccent.messageCard;
            case "Action":
                return theme.colors.flowCardsAccent.actionCard;
            case "Condition":
                return theme.colors.flowCardsAccent.conditionCard;
            case "Note":
                return theme.colors.flowCardsAccent.noteCard;
            default:
                return "#F5F5F5";
        };
    };

    useEffect(() => {
        if (groupRef.current) {
            const groupBounds = groupRef.current.getClientRect();
            setBackgroundHeight(groupBounds.height);
        };
    }, [Array(children).length]);

    return (
        <Group
            x={node.x}
            y={node.y}
            ref={groupRef}
            draggable
            onMouseEnter={() => {
                document.body.style.cursor = 'pointer';
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                document.body.style.cursor = 'default';
                setIsHovered(false);
            }}
            onDragStart={(e) => {
                e.target.moveToTop();
            }}
            onDragEnd={(e) => {
                const position = e.target.position();
                updateNode({...node, x: position.x, y: position.y})
                .unwrap()
                .then(() => {
                    refetch()
                    .unwrap()
                    .then((data) => {
                        dispatch(setNodes(data));
                    });
                });
            }}
            onClick={onClick}
        >
            <Rect
                width={defaultBackgroundWidth}
                height={backgroundHeight}
                fill={node.type ===  "Note" ? "#a5c5ff" : "#FFFFFF"}
                stroke={isHovered ? getAccentColor(node.type) : '#F5F5F5'}
                strokeWidth={1}
                cornerRadius={10}
            />

            {/* Children */}
            {children}

            {/* Connect circle */}
            {node.type !== "Note" ? <Circle
                x={defaultBackgroundWidth - 12}
                y={backgroundHeight - 12}
                width={10}
                height={10}
                fill="#FFFFFF"
                stroke={isConnectHovered ? getAccentColor(node.type) : '#F5F5F5'}
                strokeWidth={1}
                onMouseEnter={() => setIsConnectHovered(true)}
                onMouseLeave={() => setIsConnectHovered(false)}
            /> : null}
        </Group>
    );
};

export const CardButton: React.FC<{x: number, y: number, text: string, strokeColor: string, onClick?: (evt: KonvaEventObject<MouseEvent>) => void}> = ({x, y, text, strokeColor, onClick}) => {
    const [isAddConditionHovered, setIsAddConditionHovered] = useState<boolean>(false);
    const params = {
        width: defaultBackgroundWidth * 0.9,
        height: 30,
        fill: "#FFFFFF",
        stroke: isAddConditionHovered ? strokeColor : '#F5F5F5',
        strokeWidth: 1,
        cornerRadius: 7
    };
    const textRef = useRef<any>(null); 
    const [textPosition, setTextPosition] = useState({ x: x, y: y });

    useEffect(() => {
        if (textRef.current) {
            const textWidth = textRef.current.width();
            const textHeight = textRef.current.height();

            setTextPosition({
                x: (params.width - textWidth) / 2,
                y: y + (params.height - textHeight) / 2,
            });
        }
    }, [params.width, params.height]);

    return (
        <Group
            onMouseEnter={() => setIsAddConditionHovered(true)}
            onMouseLeave={() => setIsAddConditionHovered(false)}
            onClick={onClick}
        >
            <Rect
                x={x}
                y={y}
                width={params.width}
                height={params.height}
                fill={params.fill}
                stroke={params.stroke}
                strokeWidth={params.strokeWidth}
                cornerRadius={params.cornerRadius}
            />
            <Text
                ref={textRef}
                x={textPosition.x}
                y={textPosition.y}
                text={text}
                fill="#898989"
            />
        </Group>
    );
};