import React, { useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

import FlowCardContainer from '../FlowCardContainer';
import MessageCard from '../MessageCard';
import ActionCard from '../ActionCard';

import { Group } from 'react-konva';
import { Html } from 'react-konva-utils';

import './index.scss';
import '../ActionCard/index.scss';
import '../MessageCard/index.scss';

import { NodeData, NodeTypes } from './interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setDragId, setIsDragging, setNodes, setScale } from './interactiveMapSlice';
import ConditionCard from '../ConditionCard';

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

        const newNodes = nodes.map((a: NodeData) => {
            return {
                ...a,
                zIndex: a.id === id ? 2 : 1
            };
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
                style={{ backgroundColor: '#f9f9f9' }}
                onDragMove={() => {}}
            >
                <Layer>
                    {nodes.map((node: NodeData) => {
                        switch (node.type) {
                            case NodeTypes.Message:
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
                                                <FlowCardContainer stageRef={stageRef}>
                                                    <MessageCard
                                                        onMouseDown={() => handleDragStart(node.id)}
                                                        onMouseUp={handleDragEnd}
                                                    />
                                                </FlowCardContainer>
                                            </Html>
                                        </Group>
                                    </React.Fragment>
                                );
                            case NodeTypes.Action:
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
                                                        zIndex: node.zIndex
                                                    }
                                                }}
                                            >
                                                <FlowCardContainer stageRef={stageRef}>
                                                    <ActionCard
                                                        onMouseDown={() => handleDragStart(node.id)}
                                                        onMouseUp={handleDragEnd}
                                                    />
                                                </FlowCardContainer>
                                            </Html>
                                        </Group>
                                    </React.Fragment>
                                );
                                case NodeTypes.Condition:
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
                                                            zIndex: node.zIndex
                                                        }
                                                    }}
                                                >
                                                    <FlowCardContainer stageRef={stageRef}>
                                                        <ConditionCard
                                                            onMouseDown={() => handleDragStart(node.id)}
                                                            onMouseUp={handleDragEnd}
                                                        />
                                                    </FlowCardContainer>
                                                </Html>
                                            </Group>
                                        </React.Fragment>
                                    );
                            default:
                                return <div>error</div>;
                        }
                    })}
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