// React imports
import React, { useEffect, useRef } from 'react';

// Style imports
import './index.scss';
import { GoComment, GoDuplicate, GoFile, GoRepoForked, GoRocket, GoScreenNormal } from "react-icons/go";

// Components
import FlowCardContainer from '../FlowCardContainer';

// Interfaces
import { NodeData } from './interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setBlockCardClick, setDragId, setIsDragging, setIsBinding, setIsAddModal, setNodes, setScale } from './interactiveMapSlice';

// Map library
import { Group, Layer, Stage  } from 'react-konva';
import { Html } from 'react-konva-utils';
import { KonvaEventObject } from 'konva/lib/Node';

// Helpers
import { renderCardBody } from './helpers';


const InteractiveMap = () => {
    const dispatch = useAppDispatch();
    const nodes = useAppSelector((state) => state.interactiveMapSlice.nodes);
    const isDragging = useAppSelector((state) => state.interactiveMapSlice.isDragging);
    const isBinding = useAppSelector((state) => state.interactiveMapSlice.isBinding);
    const bindingFrom = useAppSelector((state) => state.interactiveMapSlice.bindingFrom);
    const blockClick = useAppSelector((state) => state.interactiveMapSlice.blockCardClick);
    const isAddModal = useAppSelector((state) => state.interactiveMapSlice.isAddModal);
    const dragId = useAppSelector((state) => state.interactiveMapSlice.dragId);
    const scale = useAppSelector((state) => state.interactiveMapSlice.scale);

    const stageRef = useRef<any>(null);

    const handleDragMove = (e: MouseEvent) => {
        if (isDragging && dragId !== null) {
            if (!blockClick) dispatch(setBlockCardClick(true));

            const newNodes = nodes.map((node: NodeData) => {
                if (node.id === dragId) {
                    return { ...node, x: node.x + e.movementX / scale, y: node.y + e.movementY / scale };
                };
                return node;
            });
            dispatch(setNodes(newNodes));
        };
    };

    useEffect(() => {
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
        setTimeout(() => {
            dispatch(setBlockCardClick(false));
        }, 100);
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

    // Handle scaling
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
                style={{ backgroundColor: '#fafafa' }}
            >
                <Layer>
                    {
                        nodes.map((node: NodeData, i) => {
                            return (
                                <React.Fragment key={i}>
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
                                                onMouseDown={(e) => {
                                                    if (e.button === 0) {
                                                        handleDragStart(node.id);
                                                    };
                                                }}
                                                onMouseUp={handleDragEnd}
                                            >
                                                {renderCardBody(node)}
                                            </FlowCardContainer>
                                        </Html>
                                    </Group>
                                </React.Fragment>
                            );
                        })
                    }
                </Layer>
            </Stage>
            <div className='flow-control'>
                <div className='flow-control__add-modal' style={{"display": isAddModal ? "flex" : "none"}}>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                    }}>
                        <GoComment color='#2F71F0' size={20} />
                        Message
                    </div>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                    }}>
                        <GoRepoForked color='#4CE99E' size={20} />
                        Condition
                    </div>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                    }}>
                        <GoRocket color='#FFC93F' size={20} />
                        Action
                    </div>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                    }}>
                        <GoFile color='#6C9FFF' size={20} />
                        Note
                    </div>
                </div>
                <div className='flow-control__add' onClick={() => dispatch(setIsAddModal(isAddModal ? false : true))}>
                    <GoDuplicate color='white' size={25}/>
                </div>
                <div className='flow-control__inc' onClick={() => handleScale('inc')}>+</div>
                <div className='flow-control__dec' onClick={() => handleScale('dec')}>-</div>
                <div className='flow-control__stack' onClick={() => {
                    const stage = stageRef.current;
                    dispatch(setScale(1));
                    stage.scale({ x: 1, y: 1 });
                    stage.position({ x: 0, y: 50 })
                }}>
                    <GoScreenNormal size={25}/>
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;