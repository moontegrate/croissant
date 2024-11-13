// Components
import { Text } from 'react-konva';
import { CardButton, CardContainer, defaultBackgroundWidth } from '../__base/components';
import ActionIcon from './icon';

// Interfaces
import { ActionCardData } from './interfaces';

// Redux
import { useAppSelector } from '../../../hooks/state';

const ActionCard: React.FC<{
    node: ActionCardData
}> = ({ node }) => {
    const theme = useAppSelector((state) => state.appSlice.theme);

    return (
        <CardContainer node={node}>
            <ActionIcon
                x={20}
                y={17}
                size={0.8}
                strokeColor={theme.colors.flowCardsAccent.actionCard}
            />
            <Text
                x={50}
                y={20}
                text='Action'
                fontSize={16}
                fontStyle='bold'
            />

            {/* "Add content" button */}
            <CardButton x={defaultBackgroundWidth * 0.05} y={50} text='+ Add an action' strokeColor={theme.colors.flowCardsAccent.actionCard}/>
        </CardContainer>
    );
};

export default ActionCard;