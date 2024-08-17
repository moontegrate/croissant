import './index.scss';
import { Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import { GoComment } from "react-icons/go";

const MessageCard = () => {
    return (
        <Group draggable width={500} height={300}>
            <Html divProps={{ style: { pointerEvents: "none" } }}>
                <div>
                    <div className='flow-card message-card'>
                        <div className='flow-card__head'>
                            <GoComment color='#2F71F0' size={30}/>
                        </div>
                    </div>
                </div>
            </Html>
        </Group>
    );
};

export default MessageCard;