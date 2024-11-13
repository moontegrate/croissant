// Interfaces
import { NoteCardData } from './interfaces';

// Redux
import { useAppDispatch } from '../../../hooks/state';
import { setNode } from '../../NoteCardModal/NoteCardModalSlice';

// Components
import { CardContainer } from '../__base/components';
import { Text } from 'react-konva';

const NoteCard: React.FC<{node: NoteCardData}> = ({node}) => {
    const dispatch = useAppDispatch();

    return (
        <CardContainer 
            node={node}
            onClick={() => {
                dispatch(setNode(node));
            }}
        >
            <Text
                x={10}
                y={10}
                text={node?.noteContent ? node?.noteContent : "Enter note text"}
            />
        </CardContainer>
    );
};

export default NoteCard;