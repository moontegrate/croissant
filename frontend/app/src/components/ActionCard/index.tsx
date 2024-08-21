// Style imports
import './index.scss';
import { GoRocket } from "react-icons/go";
import { Button } from 'flowbite-react';
import { flowCardButtonTheme } from '../../style/flowbiteThemes';

import { CardProps } from '../InteractiveMap/interfaces';

const ActionCard: React.FC<CardProps> = ({
    onMouseDown,
    onMouseMove,
    onMouseUp
}) => {
    return (
        <div
            className='flow-card action-card'
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            <div className='flow-card__head'>
                <GoRocket color='#FFC93F' size={20} />
                <h5 className='flow-card__title'>Message</h5>
            </div>
            <div className='flow-card__bottom'>
                <Button theme={flowCardButtonTheme} className='mb-2 enabled:hover:border-action-card-accent'>Add content</Button>
                <div className='flow-card__connect action-card__connect'></div>
            </div>
        </div>
    );
};

export default ActionCard;