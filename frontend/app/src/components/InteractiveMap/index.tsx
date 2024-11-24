// Style
import './index.scss';
import { GoComment, GoDuplicate, GoFile, GoRepoForked, GoRocket, GoScreenNormal } from "react-icons/go";

// Components
import { BarLoader } from 'react-spinners';
import MessageCard from '../FlowCards/MessageCard';
import ActionCard from '../FlowCards/ActionCard';
import ConditionCard from '../FlowCards/ConditionCard';
import NoteCard from '../FlowCards/NoteCard';
import TextEditModal from '../FlowCards/MessageCard/TextEditModal';
import NoteCardModal from '../NoteCardModal';

// Hooks
import { useEffect, useMemo, useRef } from 'react';

// Interfaces
import { NodeData } from '../FlowCards/__base/interfaces';
import { MessageCardData } from '../FlowCards/MessageCard/interfaces';
import { ActionCardData } from '../FlowCards/ActionCard/interfaces';
import { ConditionCardData } from '../FlowCards/ConditionCard/interfaces';
import { NoteCardData } from '../FlowCards/NoteCard/interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setIsAddModal, setNodes, setScale, setAutomationId, setAutomationName } from './interactiveMapSlice';

// Map library
import { Layer, Stage } from 'react-konva';

// Server
import { useDeleteNodeMutation, useGetAutomationNodesQuery, useGetAutomationQuery, useUpdateNodeMutation, useCreateNodeMutation } from '../../api/apiSlice';

// Routing
import { useParams } from 'react-router-dom';

// Other libraries
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';


const InteractiveMap= () => {
    const { automationId } = useParams();

    const dispatch = useAppDispatch();
    const isTokenReady = useAppSelector((state) => state.appSlice.isTokenReady);
    const nodes = useAppSelector((state) => state.interactiveMapSlice.nodes);
    const isAddModal = useAppSelector((state) => state.interactiveMapSlice.isAddModal);

    const [, {isLoading: isNodeUpdating}] = useUpdateNodeMutation();
    const [createNode, {isLoading: isNodeCreating}] = useCreateNodeMutation();
    const [, {isLoading: isNodeDeleting}] = useDeleteNodeMutation();

    const {
        data: serverNodes = [],
        isLoading: isNodesLoading,
        refetch
    } = useGetAutomationNodesQuery(automationId!, {skip: !isTokenReady});
    const {
        data: automation,
        isSuccess
    } = useGetAutomationQuery(automationId!, {skip: !isTokenReady});

    const stageRef = useRef<any>(null);
    const stage = stageRef.current;

    // if (isError) navigate('/error');

    useEffect(() => {
        if (serverNodes.length > 0) dispatch(setNodes(serverNodes));
        // eslint-disable-next-line
    }, [serverNodes]);

    useEffect(() => {
        if (automation) dispatch(setAutomationName(automation.name));
        // eslint-disable-next-line
    }, [isSuccess]);

    useEffect(() => {
        dispatch(setAutomationId(automationId!));

        return () => {
            dispatch(setNodes([]));
            dispatch(setAutomationId(""));
            dispatch(setAutomationName(""));
        };
        // eslint-disable-next-line
    }, []);

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

        const containerWidth = stage.width();
        const containerHeight = stage.height();

        const nodesWidth = maxX - minX + 625;
        const nodesHeight = maxY - minY + 400;

        const scaleX = containerWidth / nodesWidth;
        const scaleY = containerHeight / nodesHeight;
        const scale = Math.min(scaleX, scaleY);

        const offsetX = (containerWidth - nodesWidth * scale) / 2 - minX * scale;

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
        stage.position({ x: offsetX + 50, y: 100 });
        stage.batchDraw();
    };

    const renderNodes = useMemo(() => {
        const items = nodes.map((node: NodeData, i) => {
            switch (node.type) {
                case "Message":
                    return <MessageCard node={node as MessageCardData} key={i}/>
                case "Condition":
                    return <ConditionCard node={node as ConditionCardData} key={i}></ConditionCard>
                case "Action":
                    return <ActionCard node={node as ActionCardData} key={i}></ActionCard>
                case "Note":
                    return <NoteCard node={node as NoteCardData} key={i}></NoteCard>
                default:
                    break;
            }
        });

        return items;
    }, [nodes]);

    return (
        <div className='flow'>
            {isNodesLoading || isNodeUpdating || isNodeCreating || isNodeDeleting ? <div className='loading-spinner'><BarLoader color='#FF7A7A' width="100%"/></div> : null}
            {<Stage
                width={window.innerWidth}
                height={window.innerHeight}
                x={70}
                y={140}
                ref={stageRef}
                onWheel={(e) => {
                    e.evt.preventDefault();

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
                }}
                draggable
                onDragMove={() => {}}
                onDragEnd={() => {}}
                style={{ backgroundColor: '#fafafa' }}
            >
                <Layer>
                    {nodes ? renderNodes : null}
                </Layer>
            </Stage>}

            {/* Map controllers */}
            <div className='flow-control'>
                <div className='flow-control__add-modal' style={{ "display": isAddModal ? "flex" : "none" }}>
                    <button className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            id: uuidv4(),
                            type: 'Message',
                            x: 0,
                            y: 0,
                            automation: automationId!,
                            isEntryPoint: nodes.length === 0 ? true : false,
                            isBinded: false,
                            bindedTo: null
                        })
                        .unwrap()
                        .then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        });
                    }}>
                        <GoComment color='#2F71F0' size={20} />
                        Message
                    </button>
                    <button className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            id: uuidv4(),
                            automation: automationId!,
                            type: 'Condition',
                            x: 0,
                            y: 0,
                            isEntryPoint: nodes.length === 0 ? true : false,
                            isBinded: false,
                            bindedTo: null
                        })
                        .unwrap()
                        .then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        });
                    }}>
                        <GoRepoForked color='#4CE99E' size={20} />
                        Condition
                    </button>
                    <button className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            id: uuidv4(),
                            automation: automationId!,
                            type: 'Action',
                            x: 0,
                            y: 0,
                            isEntryPoint: nodes.length === 0 ? true : false,
                            isBinded: false,
                            bindedTo: null
                        })
                        .unwrap()
                        .then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        });
                    }}>
                        <GoRocket color='#FFC93F' size={20} />
                        Action
                    </button>
                    <button className='flow-control__add-modal_btn' onClick={() => {
                        dispatch(setIsAddModal(false));
                        createNode({
                            id: uuidv4(),
                            automation: automationId!,
                            type: 'Note',
                            x: 0,
                            y: 0,
                            isEntryPoint: false,
                            isBinded: false,
                            bindedTo: null,
                            noteContent: ''
                        })
                        .unwrap()
                        .then(() => {
                            refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                        })
                        .catch((error) => {
                            console.error(error);
                            toast("Something went wrong", {
                                icon: '😰'
                            });
                        });
                    }}>
                        <GoFile color='#6C9FFF' size={20} />
                        Note
                    </button>
                </div>
                <button className='flow-control__add' onClick={() => dispatch(setIsAddModal(isAddModal ? false : true))}>
                    <GoDuplicate color='white' size={25} />
                </button>
                <button className='flow-control__inc' onClick={() => handleScale('inc')}>+</button>
                <button className='flow-control__dec' onClick={() => handleScale('dec')}>-</button>
                <button className='flow-control__stack' onClick={fitNodesToScreen}>
                    <GoScreenNormal size={25} />
                </button>
            </div>

            {/* Modal windows */}
            <TextEditModal refetch={refetch}/>
            <NoteCardModal refetch={refetch}/>
        </div>
    );
};

export default InteractiveMap;