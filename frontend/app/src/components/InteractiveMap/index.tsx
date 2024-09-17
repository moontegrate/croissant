// React imports
import React, { useEffect, useRef } from 'react';

// Style imports
import './index.scss';
import { GoComment, GoDuplicate, GoFile, GoRepoForked, GoRocket, GoScreenNormal } from "react-icons/go";

// Components
import FlowCardContainer from '../FlowCardContainer';
import { BarLoader } from 'react-spinners';

// Interfaces
import { ArrowData, NodeData } from './interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setArrows, setBlockCardClick, setDragId, setIsDragging, setIsBinding, setBindingFrom, setIsAddModal, setNodes, setScale } from './interactiveMapSlice';

// Map library
import { Group, Layer, Stage, Arrow } from 'react-konva';
import { Html } from 'react-konva-utils';
import { KonvaEventObject } from 'konva/lib/Node';

// Helpers
import { renderCardBody } from './helpers';

// Server
import { useDeleteNodeMutation, useGetNodesQuery, useUpdateNodeMutation, useCreateNodeMutation } from '../../api/apiSlice';

// Routing
import { useNavigate } from 'react-router-dom';

// Other libraries
import { v4 as uuidv4 } from 'uuid';

const InteractiveMap: React.FC<{automationId: string}> = (automationId) => {
    const navigate = useNavigate();

    const {
        data = [],
        isFetching,
        isLoading: isNodesLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetNodesQuery(automationId.automationId);

    if (isError) navigate('/error');

    const [updateNode, {isLoading: isNodeUpdating}] = useUpdateNodeMutation();
    const [createNode, {isLoading: isNodeCreating}] = useCreateNodeMutation();
    const [deleteNode, {isLoading: isNodeDeleting}] = useDeleteNodeMutation();

    const dispatch = useAppDispatch();
    const nodes = useAppSelector((state) => state.interactiveMapSlice.nodes);
    const arrows = useAppSelector((state) => state.interactiveMapSlice.arrows);
    const isDragging = useAppSelector((state) => state.interactiveMapSlice.isDragging);
    const isBinding = useAppSelector((state) => state.interactiveMapSlice.isBinding);
    const bindingFrom = useAppSelector((state) => state.interactiveMapSlice.bindingFrom);
    const blockClick = useAppSelector((state) => state.interactiveMapSlice.blockCardClick);
    const isAddModal = useAppSelector((state) => state.interactiveMapSlice.isAddModal);
    const dragId = useAppSelector((state) => state.interactiveMapSlice.dragId);
    const scale = useAppSelector((state) => state.interactiveMapSlice.scale);

    const stageRef = useRef<any>(null);

    useEffect(() => {
        dispatch(setNodes(data))
    }, [isNodesLoading]);

    const handleDragMove = (e: MouseEvent) => {
        if (isDragging && dragId !== null) {
            if (!blockClick) dispatch(setBlockCardClick(true));

            const newNodes = nodes.map((node: NodeData) => {
                if (node.id === dragId) {
                    return { ...node, x: node.x + e.movementX / scale, y: node.y + e.movementY / scale };
                };
                return node;
            });

            const node = nodes.find(item => item.id === dragId);

            if (node?.isBinded) {
                const newArrows = arrows.map((arrow: ArrowData) => {
                    if (arrow.from === node.id) {
                        return {...arrow, x: arrow.x || 0 + e.movementX / scale, y: arrow.y || 0 + e.movementY / scale };
                    };
                    return arrow;
                });

                dispatch(setArrows(newArrows));
            };

            dispatch(setNodes(newNodes));
        };
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleDragMove);

        return () => {
            document.removeEventListener('mousemove', handleDragMove);
        };
    }, [isDragging, dragId, nodes, dispatch, scale]);

    const handleDragStart = (id: string) => {
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
        updateNode({automation: automationId.automationId, node: nodes.find(i => i.id === dragId)!}).then(() => {
            dispatch(setIsDragging(false));
            dispatch(setDragId(undefined));
        });
        setTimeout(() => {
            dispatch(setBlockCardClick(false));
        }, 50);
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
    const handleScale = (type: string) => {
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

    const fitNodesToScreen = () => {
        if (!stageRef.current) return;

        const nodePositions = nodes.map(node => ({
            x: node.x,
            y: node.y,
        }));

        const minX = Math.min(...nodePositions.map(pos => pos.x));
        const minY = Math.min(...nodePositions.map(pos => pos.y));
        const maxX = Math.max(...nodePositions.map(pos => pos.x));
        const maxY = Math.max(...nodePositions.map(pos => pos.y));

        const stage = stageRef.current;
        const containerWidth = stage.width();
        const containerHeight = stage.height();

        const nodesWidth = maxX - minX + 625;
        const nodesHeight = maxY - minY + 400;

        const scaleX = containerWidth / nodesWidth;
        const scaleY = containerHeight / nodesHeight;
        const scale = Math.min(scaleX, scaleY);

        const offsetX = (containerWidth - nodesWidth * scale) / 2 - minX * scale;
        const offsetY = (containerHeight - nodesHeight * scale) / 2 - minY * scale;

        if (scale < 4 && scale > 0.5) {
            stage.scale({ x: scale, y: scale });
            dispatch(setScale(scale));
        } else if (scale > 4) {
            stage.scale({ x: 4, y: 4 });
            dispatch(setScale(scale));
        } else if (scale < 0.5) {
            stage.scale({ x: 0.5, y: 0.5 });
            dispatch(setScale(scale));
        };
        stage.position({ x: offsetX + 50, y: 50 });
        stage.batchDraw();
    };

    const handleLinking = (id: string) => {
        const stage = stageRef.current;
        const node = nodes.find(item => item.id === id);
        const pointer = stage.getPointerPosition();

        return (
            <div className='bind-arrow'>
                <Arrow
                    points={[node!.x + 335, node!.y + 110, pointer.x, pointer.y]}
                    pointerLength={10}
                    pointerWidth={10}
                    fill="gray"
                    stroke="gray"
                    strokeWidth={1}
                    tension={10}
                />
            </div>
        )
    };

    return (
        <div className='flow'>
            {isNodesLoading || isNodeUpdating || isNodeCreating || isNodeDeleting ? <div className='flow-spinner'><BarLoader color='#FF7A7A' width="100%"/></div> : null}
            {<Stage
                width={window.innerWidth}
                height={window.innerHeight}
                x={70}
                y={90}
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
                                                id={node.id}
                                                stageRef={stageRef}
                                                canBeEntryPoint={node.type === "Note" ? false : true}
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
                    {isBinding ? handleLinking(bindingFrom!) : null}
                </Layer>
            </Stage>}
            <div className='flow-control'>
                <div className='flow-control__add-modal' style={{ "display": isAddModal ? "flex" : "none" }}>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            automation: automationId.automationId,
                            node: {
                                id: uuidv4(),
                                type: 'Message',
                                x: 0,
                                y: 0,
                                zIndex: nodes.length + 1,
                                isEntryPoint: nodes.length === 0 ? true : false,
                                isBinded: false,
                                bindedTo: null
                            }
                        }).then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        });
                    }}>
                        <GoComment color='#2F71F0' size={20} />
                        Message
                    </div>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            automation: automationId.automationId,
                            node: {
                                id: uuidv4(),
                                type: 'Condition',
                                x: 0,
                                y: 0,
                                zIndex: nodes.length + 1,
                                isEntryPoint: nodes.length === 0 ? true : false,
                                isBinded: false,
                                bindedTo: null
                            }
                        }).then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        });
                    }}>
                        <GoRepoForked color='#4CE99E' size={20} />
                        Condition
                    </div>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            automation: automationId.automationId,
                            node: {
                                id: uuidv4(),
                                type: 'Action',
                                x: 0,
                                y: 0,
                                zIndex: nodes.length + 1,
                                isEntryPoint: nodes.length === 0 ? true : false,
                                isBinded: false,
                                bindedTo: null
                            }
                        }).then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        });
                    }}>
                        <GoRocket color='#FFC93F' size={20} />
                        Action
                    </div>
                    <div className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            automation: automationId.automationId,
                            node: {
                                id: uuidv4(),
                                type: 'Note',
                                x: 0,
                                y: 0,
                                zIndex: nodes.length + 1,
                                isEntryPoint: false,
                                isBinded: false,
                                bindedTo: null,
                                noteContent: ''
                            }
                        }).then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        });
                    }}>
                        <GoFile color='#6C9FFF' size={20} />
                        Note
                    </div>
                </div>
                <div className='flow-control__add' onClick={() => dispatch(setIsAddModal(isAddModal ? false : true))}>
                    <GoDuplicate color='white' size={25} />
                </div>
                <div className='flow-control__inc' onClick={() => handleScale('inc')}>+</div>
                <div className='flow-control__dec' onClick={() => handleScale('dec')}>-</div>
                <div className='flow-control__stack' onClick={fitNodesToScreen}>
                    <GoScreenNormal size={25} />
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;