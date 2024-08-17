import React, { useRef, useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import MessageCard from '../MessageCard';

import './index.scss';

interface NodeData {
    id: string;
    label: string;
    x: number;
    y: number;
}

const initialNodes: NodeData[] = [
    { id: '1', label: 'Начало', x: 50, y: 100 },
    { id: '2', label: 'Шаг 1', x: 200, y: 100 },
];

const InteractiveMap = () => {
    const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
    const stageRef = useRef<any>(null);

    const handleDragMove = (id: string, pos: { x: number; y: number }) => {
        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === id ? { ...node, x: pos.x, y: pos.y } : node
            )
        );
    };

    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();

        const stage = stageRef.current;
        const scaleBy = 1.1;

        if (stage) {
            const oldScale = stage.scaleX();
            const pointer = stage.getPointerPosition();
            const mousePos = { x: pointer.x, y: pointer.y };
            const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
            const newPos = {
                x: stage.x() - (mousePos.x - stage.x()) * (newScale / oldScale - 1),
                y: stage.y() - (mousePos.y - stage.y()) * (newScale / oldScale - 1),
            };

            stage.scale({ x: newScale, y: newScale });
            stage.position(newPos);
            stage.batchDraw();
        }
    };

    // const handleScale = (type: string) => {
    //     if (stage) {
    //         const oldScale = stage.scaleX();
            
    //         const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    //         const newPos = {
    //             x: stage.x() - (mousePos.x - stage.x()) * (newScale / oldScale - 1),
    //             y: stage.y() - (mousePos.y - stage.y()) * (newScale / oldScale - 1),
    //         };
    //         stage.scale({ x: newScale, y: newScale });
    //         stage.position(newPos);
    //         stage.batchDraw();
    //     }
    // }

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
            >
                <Layer>
                    {nodes.map(node => (
                        <React.Fragment key={node.id}>
                            <MessageCard/>
                        </React.Fragment>
                    ))}
                </Layer>
            </Stage>
            <div className='flow-control'>
                <div className='flow-control__inc'>+</div>
                <div className='flow-control__dec'>-</div>
            </div>
        </div>
    );
};

export default InteractiveMap;