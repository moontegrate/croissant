// Style imports
import './index.scss';
import { GoComment } from "react-icons/go";
import { flowCardButtonTheme } from '../../../style/flowbiteThemes';

// Components
import { Button } from 'flowbite-react';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

const MessageCard: React.FC<CardProps> = ({
    onMouseDown,
    onMouseUp
}) => {
    return (
        <div
            className='flow-card message-card'
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            <div className='flow-card__head'>
                <GoComment color='#2F71F0' size={20} />
                <h5 className='flow-card__title'>Message</h5>
            </div>
            <div className='flow-card__bottom'>
                <Button theme={flowCardButtonTheme} className='mb-2 enabled:hover:border-message-card-accent'>+ Add content</Button>
                <div className='flow-card__connect message-card__connect'></div>
            </div>
        </div>
    );
};

export default MessageCard;