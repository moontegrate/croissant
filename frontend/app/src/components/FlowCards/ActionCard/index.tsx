// Style imports
import './index.scss';
import { GoRocket } from "react-icons/go";
import { flowCardButtonTheme } from '../../../style/flowbiteThemes';

// Components
import { Button } from 'flowbite-react';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

const ActionCard: React.FC<CardProps> = () => {
    return (
        <div className='flow-card action-card'>
            <div className='flow-card__head'>
                <GoRocket color='#FFC93F' size={20} />
                <h5 className='flow-card__title'>Action</h5>
            </div>
            <div className='flow-card__bottom'>
                <Button theme={flowCardButtonTheme} className='mb-2 enabled:hover:border-action-card-accent'>Click to add an action</Button>
                <div className='flow-card__connect action-card__connect'></div>
            </div>
        </div>
    );
};

export default ActionCard;