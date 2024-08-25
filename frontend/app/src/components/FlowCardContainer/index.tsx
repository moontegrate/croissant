import { CardContainerProps } from "./interfaces";
import { GoTriangleRight } from "react-icons/go";

// Redux
import { useAppDispatch } from "../../hooks/state";
import { setScale } from "../InteractiveMap/interactiveMapSlice";

const FlowCardContainer: React.FC<CardContainerProps> = ({children, stageRef, isEntryPoint, onMouseDown, onMouseUp}) => {
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="flow-card__top">
                {isEntryPoint ? <div
                    className="flow-card__entry-point"
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                >
                    <GoTriangleRight/>
                    Entry point
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
        </>
    );
};

export default FlowCardContainer;