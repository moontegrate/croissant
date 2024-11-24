import { Shape } from 'react-konva';

const MessageIcon = ({ x, y, size, strokeColor }: { x: number; y: number; size: number, strokeColor: string }) => {
    return (
        <Shape
            x={x}
            y={y}
            sceneFunc={(context, shape) => {
                context.fillStyle = strokeColor;
                context.fill(new Path2D("M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.69l-3.573 3.573A1.458 1.458 0 0 1 5 21.043V18.5H3.25a1.75 1.75 0 0 1-1.75-1.75ZM3.25 4a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.72-3.72a.749.749 0 0 1 .53-.22h10a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25Z"));
            }}
            scaleX={size}
            scaleY={size}
        />
    );
};

export default MessageIcon;