// Style imports
import './index.scss';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

// Redux
import { useAppDispatch } from '../../../hooks/state';
import { setIsModalOpen, setNode } from '../../NoteCardModal/NoteCardModalSlice';

const NoteCard: React.FC<CardProps> = ({node}) => {
    const dispatch = useAppDispatch();

    return (
        <div
            className='flow-card note-card'
            onClick={() => {
                dispatch(setNode(node!));
                dispatch(setIsModalOpen(true));
            }}
        >
            <div className='flow-card__content'>
                {node?.noteContent}
            </div>
        </div>
    );
};

export default NoteCard;