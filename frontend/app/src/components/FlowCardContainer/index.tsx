// Style imports
import { GoCopy, GoSingleSelect, GoTrash, GoTriangleRight } from "react-icons/go";

// Interfaces
import { CardContainerProps } from "./interfaces";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { setScale, setNodes } from "../InteractiveMap/interactiveMapSlice";

// Hooks
import { useState } from "react";

// Server
import { useDeleteNodeMutation, useGetAutomationNodesQuery, useCreateNodeMutation } from "../../api/apiSlice";

// Libraries
import { v4 as uuidv4 } from 'uuid';

const FlowCardContainer: React.FC<CardContainerProps> = ({children, node, stageRef, canBeEntryPoint, onMouseDown, onMouseUp}) => {
    const dispatch = useAppDispatch();
    const [showFloatingMenu, setShowFloatingMenu] = useState<boolean>(false);

    const automationId = useAppSelector((state) => state.interactiveMapSlice.automationId);

    const {
        refetch
    } = useGetAutomationNodesQuery(automationId);
    const [deleteNode] = useDeleteNodeMutation();
    const [createNode] = useCreateNodeMutation();

    return (
        <div
            onMouseEnter={() => setShowFloatingMenu(true)}
            onMouseLeave={() => setShowFloatingMenu(false)}
        >
            {/* Card's top */}
            <div className="flow-card__top">
                {/* "Entity point" shortcut */}
                {node.isEntryPoint ? <div
                    className="flow-card__entry-point"
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                >
                    <GoTriangleRight/>
                    Entry point
                </div> : null}

                {/* Floating menu with 3 buttons */}
                {showFloatingMenu ? <div
                    className="flow-card__floating-menu"
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                >
                    {/* Button make entity point is not available for note card */}
                    {canBeEntryPoint ? <button
                            className="flow-card__floating-menu-btn"
                            style={{
                                opacity: node.isEntryPoint ? "0.2" : "1"
                            }}
                            disabled={node.isEntryPoint}
                        >
                            <GoSingleSelect/>
                        </button> : null}
                    <button
                        className="flow-card__floating-menu-btn"
                        onClick={() => {
                            createNode({...node, id: uuidv4(), isEntryPoint: false, x: node.x + 100, y: node.y + 100}).then(() => {
                                refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                            });
                        }}
                    >
                        <GoCopy/>
                    </button>
                    <button
                        className="flow-card__floating-menu-btn"
                        onClick={() => {
                            if (!node.isEntryPoint) {
                                deleteNode(node.id);
                                refetch().then((res) => res.data ? dispatch(setNodes(res.data)) : null);
                            };
                        }}
                        style={{
                            opacity: node.isEntryPoint ? "0.2" : "1"
                        }}
                        disabled={node.isEntryPoint}
                    >
                        <GoTrash/>
                    </button>
                </div> : null}
            </div>
            <div
                className="flow-card__body"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onWheel={(e) => {
                    const stage = stageRef.current;
                    const scaleBy = 1.05;

                    if (stage) {
                        const oldScale = stage.scaleX();
                        const pointer = stage.getPointerPosition();
                        const mousePos = { x: pointer.x, y: pointer.y };
                        const newScale = e.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
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
            >
                {children}
            </div>
        </div>
    );
};

export default FlowCardContainer;