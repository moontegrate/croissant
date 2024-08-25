// Style imports
import './index.scss';
import { GoRepoForked } from "react-icons/go";
import { flowCardButtonTheme } from '../../../style/flowbiteThemes';

// Components
import { Button } from 'flowbite-react';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

const ConditionCard: React.FC<CardProps> = () => {
    return (
        <div className='flow-card condition-card'>
            <div className='flow-card__head'>
                <GoRepoForked color='#4CE99E' size={20} />
                <h5 className='flow-card__title'>Condition</h5>
            </div>
            <div className='flow-card__bottom'>
                <Button theme={flowCardButtonTheme} className='mb-2 enabled:hover:border-condition-card-accent'>+ Add condition</Button>
                <div className='flow-card__connect condition-card__connect'></div>
            </div>
        </div>
    );
};

export default ConditionCard;