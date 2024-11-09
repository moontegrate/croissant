// Components
import { Stage, Layer, Shape } from 'react-konva';

const MessageCardShape: React.FC<{
    x: number; 
    y: number; 
    width: number; 
    height: number; 
    title: string;
}> = ({ x, y, width, height, title }) => {
    return (
        <Shape
            x={x}
            y={y}
            draggable
        >

        </Shape>
    );
};

export default MessageCardShape;