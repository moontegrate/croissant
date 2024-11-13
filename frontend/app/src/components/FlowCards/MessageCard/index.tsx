// Components
import { Group, Rect, Text } from 'react-konva';
import { CardButton, CardContainer, defaultBackgroundWidth } from '../__base/components';
import MessageIcon from "./icon";

// Hooks
import { useState } from 'react';

// Interfaces
import { MessageCardData } from './interfaces';

// Redux
import { useAppSelector } from '../../../hooks/state';

const MessageCard: React.FC<{
    node: MessageCardData
}> = ({ node }) => {
    const theme = useAppSelector((state) => state.appSlice.theme);
    const [isDropdownShow, setIsDropdownShow] = useState<boolean>(false);

    return (
        <>
            <CardContainer node={node}>
                <MessageIcon
                    x={20}
                    y={17}
                    size={0.8}
                    strokeColor={theme.colors.flowCardsAccent.messageCard}
                />
                <Text
                    x={50}
                    y={20}
                    text='Message'
                    fontSize={16}
                    fontStyle='bold'
                />

                {/* "Add content" button */}
                <CardButton x={defaultBackgroundWidth * 0.05} y={50} text='+ Add content' strokeColor={theme.colors.flowCardsAccent.messageCard}/>
            </CardContainer>

            {/* "Add content" button dropdown */}
            {
                isDropdownShow ?
                    <Group>
                        <Rect
                            width={defaultBackgroundWidth * 0.9}
                            height={200}
                            stroke='#F5F5F5'
                            strokeWidth={1}
                        />
                    </Group>
                : null
            }
        </>
    );
};

export default MessageCard;