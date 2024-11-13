// Components
import { Group, Rect, Text } from 'react-konva';
import { CardButton, CardContainer, defaultBackgroundWidth } from '../__base/components';
import ConditionIcon from './icon';

// Hooks
import { useEffect, useRef, useState } from 'react';

// Interfaces
import { ConditionCardData } from './interfaces';

// Redux
import { useAppSelector } from '../../../hooks/state';

const ConditionCard: React.FC<{
    node: ConditionCardData
}> = ({ node }) => {
    const theme = useAppSelector((state) => state.appSlice.theme);    

    return (
        <CardContainer node={node}>
            <ConditionIcon
                x={20}
                y={17}
                size={0.8}
                strokeColor={theme.colors.flowCardsAccent.conditionCard}
            />
            <Text
                x={50}
                y={20}
                text='Condition'
                fontSize={16}
                fontStyle='bold'
            />

            {/* "Add condition" button */}
            <CardButton x={defaultBackgroundWidth * 0.05} y={50} text='+ Add condition' strokeColor={theme.colors.flowCardsAccent.conditionCard}/>
        </CardContainer>
    );
};

export default ConditionCard;