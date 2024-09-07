// React imports
import React, { useEffect, useRef } from 'react';

// Style imports
import './index.scss';

// Components
import FlowCardContainer from '../FlowCardContainer';
import MessageCard from '../FlowCards/MessageCard';
import ActionCard from '../FlowCards/ActionCard';
import ConditionCard from '../FlowCards/ConditionCard';
import NoteCard from '../FlowCards/NoteCard';

// Interfaces
import { NodeData } from './interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setDragId, setIsDragging, setNodes, setScale } from './interactiveMapSlice';

// Map library
import { Group, Layer, Stage  } from 'react-konva';
import { Html } from 'react-konva-utils';
import { KonvaEventObject } from 'konva/lib/Node';


const InteractiveMap = () => {
    const dispatch = useAppDispatch();
    const nodes = useAppSelector((state) => state.interactiveMapSlice.nodes);
    const isDragging = useAppSelector((state) => state.interactiveMapSlice.isDragging);
    const dragId = useAppSelector((state) => state.interactiveMapSlice.dragId);
    const scale = useAppSelector((state) => state.interactiveMapSlice.scale);

    const stageRef = useRef<any>(null);

    useEffect(() => {
        const handleDragMove = (e: MouseEvent) => {
            if (isDragging && dragId !== null) {
                const newNodes = nodes.map((node: NodeData) => {
                    if (node.id === dragId) {
                        return { ...node, x: node.x + e.movementX / scale, y: node.y + e.movementY / scale };
                    };
                    return node;
                });
                dispatch(setNodes(newNodes));
            };
        };
    
        document.addEventListener('mousemove', handleDragMove);
    
        return () => {
            document.removeEventListener('mousemove', handleDragMove);
        };
    }, [isDragging, dragId, nodes, dispatch, scale]);

    const handleDragStart = (id: number) => {
        dispatch(setIsDragging(true));
        dispatch(setDragId(id));

        const indexes = nodes.map((a: NodeData) => {
            return a.zIndex;
        });

        const newNodes = nodes.map((a: NodeData) => {
            if (a.id === id) {
                return { ...a, zIndex: nodes.length };
            };
        
            if (a.zIndex === nodes.length) {
                const newZIndex = indexes.find((i) => !indexes.includes(i)) || a.zIndex - 1;
                return { ...a, zIndex: newZIndex };
            };
        
            return a;
        });
        dispatch(setNodes(newNodes));
    };

    const handleDragEnd = () => {
        dispatch(setIsDragging(false));
        dispatch(setDragId(undefined));
    };

    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();

        const stage = stageRef.current;
        const scaleBy = 1.05;

        if (stage) {
            const oldScale = stage.scaleX();
            const pointer = stage.getPointerPosition();
            const mousePos = { x: pointer.x, y: pointer.y };
            const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
            const newPos = {
                x: stage.x() - (mousePos.x - stage.x()) * (newScale / oldScale - 1),
                y: stage.y() - (mousePos.y - stage.y()) * (newScale / oldScale - 1),
            };

            if (newScale < 4 && newScale > 0.5) {
                dispatch(setScale(newScale));
                stage.scale({ x: newScale, y: newScale });
                stage.position(newPos);
                stage.batchDraw();
            };
        };
    };

    const handleScale = ( type: string) => {
        const stage = stageRef.current;
        const scaleBy = 1.05;

        if (stage) {
            const oldScale = stage.scaleX();
            
            const newScale = type === 'inc' ? oldScale * scaleBy : oldScale / scaleBy;
            const newPos = {
                x: stage.x() - stage.x() * (newScale / oldScale - 1),
                y: stage.y() - stage.y() * (newScale / oldScale - 1),
            };
            if (newScale < 4 && newScale > 0.5) {
                dispatch(setScale(newScale));
                stage.scale({ x: newScale, y: newScale });
                stage.position(newPos);
                stage.batchDraw();
            };
        };
    };

    function renderCards(nodes: NodeData[]) {
        function renderCardBody(node: NodeData): JSX.Element {
            switch (node.type) {
                case "Message":
                    return (
                        <MessageCard/>
                    );
                case "Action":
                    return (
                        <ActionCard/>
                    );
                case "Condition":
                    return (
                        <ConditionCard/>
                    );
                case "Note":
                    return (
                        <NoteCard
                            node={node}
                        />
                    );
                default:
                    return (
                        <div>Error while card rendering</div>
                    )
            }
        }

        const result = nodes.map((node: NodeData) => {
            return (
                <React.Fragment key={node.id}>
                    <Group
                        x={node.x}
                        y={node.y}
                        width={500}
                        height={300}                                        
                    >
                        <Html
                            divProps={{
                                style: {
                                    pointerEvents: "auto",
                                    zIndex: node.zIndex
                                }
                            }}
                            
                        >
                            <FlowCardContainer
                                stageRef={stageRef}
                                isEntryPoint={node.isEntryPoint}
                                onMouseDown={() => handleDragStart(node.id)}
                                onMouseUp={handleDragEnd}
                            >
                                {renderCardBody(node)}
                            </FlowCardContainer>
                        </Html>
                    </Group>
                </React.Fragment>
            );
        })

        return result;
    };

    return (
        <div className='flow'>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                x={70}
                y={50}
                ref={stageRef}
                onWheel={handleWheel}
                draggable
                style={{ backgroundColor: '#fafafa' }}
                onDragMove={() => {}}
            >
                <Layer>
                    {renderCards(nodes)}
                </Layer>
            </Stage>
            <div className='flow-control'>
                <div className='flow-control__inc' onClick={() => handleScale('inc')}>+</div>
                <div className='flow-control__dec' onClick={() => handleScale('dec')}>-</div>
            </div>
        </div>
    );
};

export default InteractiveMap;