// Style
import './index.scss';

// Interfaces
import { NoteCardData } from './interfaces';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { setIsModalOpen, setNode } from '../../NoteCardModal/NoteCardModalSlice';

const NoteCard: React.FC<{node: NoteCardData}> = ({node}) => {
    const dispatch = useAppDispatch();

    const blockClick = useAppSelector((state) => state.interactiveMapSlice.blockCardClick);

    return (
        <div
            className='flow-card note-card'
            onClick={() => {
                if (!blockClick) {
                    dispatch(setNode(node!));
                    dispatch(setIsModalOpen(true));
                };
            }}
        >
            <div className='flow-card__content'>
                {node?.noteContent ? node?.noteContent : "Enter note text"}
            </div>
        </div>
    );
};

export default NoteCard;