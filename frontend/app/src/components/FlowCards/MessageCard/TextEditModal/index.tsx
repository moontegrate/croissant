// Style
import './index.scss';
import { modalTheme, textInputTheme } from '../../../../style/flowbiteThemes';

// Components
import { Modal, TextInput } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/state';
import { setIsTextEditModal } from '../../../InteractiveMap/interactiveMapSlice';

// Hooks
import { useEffect, useState } from 'react';

// Server
import { useUpdateNodeMutation } from '../../../../api/apiSlice';

const TextEditModal: React.FC<{ refetch: () => void }> = ({ refetch }) => {
    const dispatch = useAppDispatch();

    const isTextEditModal = useAppSelector((state) => state.interactiveMapSlice.isTextEditModal);
    const node = useAppSelector((state) => state.interactiveMapSlice.textEditingNode);

    const [inputValue, setInputValue] = useState('');

    const [updateNode] = useUpdateNodeMutation();
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (node) {
                updateNode({...node, text: inputValue});
            } else {
                console.log('Error while edit message card text');
            };
        }, 500);

        return () => clearTimeout(handler);
        // eslint-disable-next-line
    }, [inputValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    
    return (
        <Modal
            theme={modalTheme}
            dismissible
            show={isTextEditModal}
            onClose={() => {
                dispatch(setIsTextEditModal(false));
                refetch();
            }}
        >
            <Modal.Header>
                Add message
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">Set message text for selected block</p>
            </Modal.Header>
            <Modal.Body className='pt-[1px]'>
                <TextInput theme={textInputTheme} placeholder='Enter message' defaultValue={node?.text || ''} onChange={handleChange}/>
            </Modal.Body>
        </Modal>
    );
};

export default TextEditModal;