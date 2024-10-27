// Style imports
import './index.scss';
import { GoComment, GoCreditCard, GoFileMedia, GoVideo } from "react-icons/go";
import { flowCardButtonTheme, verticalDropdownTheme } from '../../../style/flowbiteThemes';

// Components
import { Button, Dropdown } from 'flowbite-react';
import TextSubwindow from './TextSubwindow';

// Interfaces
import { MessageCardData } from './interfaces';

// Hooks
import { useState } from 'react';

const MessageCard: React.FC<{node: MessageCardData}> = ({node}) => {
    const [isTextOn, setIsTextOn] = useState<boolean>(false);

    return (
        <div className='flow-card message-card'>
            <div className='flow-card__head'>
                <GoComment color='#2F71F0' size={20} />
                <h5 className='flow-card__title'>Message</h5>
            </div>
            {isTextOn || node.text ? <TextSubwindow node={node} onClose={() => setIsTextOn(false)}/> : null}

            {/* "Add Content" with dropdown menu */}
            <div className='flow-card__bottom'>
                <Dropdown className='vertical-dropdown' label='' theme={verticalDropdownTheme} renderTrigger={() => <Button disabled={isTextOn} theme={flowCardButtonTheme} className='mb-2 enabled:hover:border-message-card-accent'>+ Add content</Button>}>
                    <Dropdown.Item className='vertical-dropdown__item' onClick={() => {setIsTextOn(true)}}>
                        <GoComment size={17}/>Text + Quick replies
                    </Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item' onClick={() => {}}>
                        <GoCreditCard size={17}/>Card template
                    </Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item' onClick={() => {}}>
                        <GoFileMedia size={17}/>Image
                    </Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item' onClick={() => {}}>
                        <GoVideo size={17}/>Video
                    </Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item' onClick={() => {}}>
                        <GoCreditCard size={17}/>Audio
                    </Dropdown.Item>
                </Dropdown>
                <div className='flow-card__connect message-card__connect'></div>
            </div>
        </div>
    );
};

export default MessageCard;