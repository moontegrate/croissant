// Style imports
import './index.scss';

// Interfaces
import { CardProps } from '../../InteractiveMap/interfaces';

const NoteCard: React.FC<CardProps> = ({
    onMouseDown,
    onMouseUp,
    content
}) => {
    return (
        <div
            className='flow-card note-card'
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            <div className='flow-card__content'>
                {content}
            </div>
        </div>
    );
};

export default NoteCard;