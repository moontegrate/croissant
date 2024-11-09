// Style
import { NodeType } from '../InteractiveMap/interfaces';
import './index.scss';

// Components
import { Arrow } from 'react-konva';

const NodeBindingArrow: React.FC<{node: NodeType, pointer: any}> = ({node, pointer}) => {
    return (
        <div className='binding-arrow' style={{zIndex: node.zIndex + 1}}>
            <Arrow
                points={pointer}
                pointerLength={10}
                pointerWidth={10}
                fill="gray"
                stroke="gray"
                strokeWidth={1}
                tension={10}
            />
        </div>
    );
};

export default NodeBindingArrow;