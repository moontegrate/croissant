// Style imports
import './index.scss';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { setIsModalOpen, setNode } from '../../NoteCardModal/NoteCardModalSlice';

const NoteCard: React.FC<CardProps> = ({node}) => {
    const dispatch = useAppDispatch();

    const isDragging = useAppSelector((state) => state.interactiveMapSlice.isDragging);

    return (
        <div
            className='flow-card note-card'
            onClick={() => {
                if (!isDragging) {
                    dispatch(setNode(node!));
                    dispatch(setIsModalOpen(true));
                };
            }}
        >
            <div className='flow-card__content'>
                {node?.noteContent}
            </div>
        </div>
    );
};

export default NoteCard;