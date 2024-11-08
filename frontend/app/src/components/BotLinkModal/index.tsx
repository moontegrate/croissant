// Style
import './index.scss';
import { buttonTheme, modalTheme, textInputTheme } from '../../style/flowbiteThemes';

// Components
import { Button, Modal, TextInput } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setBotLinkData } from '../../pages/layouts/automations/automationsSlice';

// Notifications
import toast from 'react-hot-toast';

const BotLinkModal = () => {
    const dispatch = useAppDispatch();
    const botLinkData = useAppSelector((state) => state.automationsSlice.botLinkData);
    const linkValue = botLinkData?.channel === 'Instagram' ? `https://instagram.com/${botLinkData?.name}/` : `http://t.me/${botLinkData?.name}/`;

    return (
        <Modal
            show={botLinkData !== null}
            dismissible
            theme={modalTheme}
            onClose={() => dispatch(setBotLinkData(null))}
        >
            <Modal.Header>
                Bot link
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Clicking on the link triggers automation
                </p>
            </Modal.Header>
            <Modal.Body className='py-0'>
                <TextInput disabled value={linkValue}/>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='w-full'
                    theme={buttonTheme}
                    onClick={() => {
                        navigator.clipboard.writeText(linkValue);
                        toast('Link copied to clipboard', {icon: '👍'});
                    }}
                >
                    Copy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BotLinkModal;