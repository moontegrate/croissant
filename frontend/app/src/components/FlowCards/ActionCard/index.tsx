// Style imports
import './index.scss';
import { GoRocket } from "react-icons/go";
import { flowCardButtonTheme } from '../../../style/flowbiteThemes';

// Components
import { Button } from 'flowbite-react';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { setBindingFrom, setIsBinding } from '../../InteractiveMap/interactiveMapSlice';

const ActionCard: React.FC<CardProps> = ({node}) => {
    const dispatch = useAppDispatch();

    const isBinding = useAppSelector((state) => state.interactiveMapSlice.isBinding);

    return (
        <div className='flow-card action-card'>
            <div className='flow-card__head'>
                <GoRocket color='#FFC93F' size={20} />
                <h5 className='flow-card__title'>Action</h5>
            </div>
            <div className='flow-card__bottom'>
                <Button theme={flowCardButtonTheme} className='mb-2 enabled:hover:border-action-card-accent'>Click to add an action</Button>
                <div className={isBinding ? 'flow-card__connect action-card__connect binding' : 'flow-card__connect action-card__connect'} onClick={() => {
                    dispatch(setIsBinding(true));
                    dispatch(setBindingFrom(node!.id));
                }}></div>
            </div>
        </div>
    );
};

export default ActionCard;