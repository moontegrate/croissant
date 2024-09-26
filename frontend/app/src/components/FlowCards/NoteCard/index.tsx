// Style imports
import './index.scss';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { setIsModalOpen, setNode } from '../../NoteCardModal/NoteCardModalSlice';

const NoteCard: React.FC<CardProps> = ({node}) => {
    const dispatch = useAppDispatch();

    const dragId = useAppSelector((state) => state.interactiveMapSlice.dragId);
    const blockClick = useAppSelector((state) => state.interactiveMapSlice.blockCardClick);

    return (
        <div
            className='flow-card note-card'
            onClick={() => {
                if (!blockClick) {
                    dispatch(setNode(node!));
                    dispatch(setIsModalOpen(true));
                }
            }}
        >
            <div className='flow-card__content'>
                {node?.noteContent ? node?.noteContent : "Enter note text"}
            </div>
        </div>
    );
};

export default NoteCard;