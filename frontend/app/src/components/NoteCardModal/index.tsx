// Style import
import './index.scss';
import { modalTheme, textInputTheme } from '../../style/flowbiteThemes';

// Components
import { Modal, TextInput } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setNodes } from '../InteractiveMap/interactiveMapSlice';
import { setIsModalOpen, setNode } from './NoteCardModalSlice';

// Server
import { useUpdateNodeMutation } from '../../api/apiSlice';

const NoteCardModal = () => {
    const [updateNode, {isLoading: isNodeUpdating}] = useUpdateNodeMutation();

    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector((state) => state.NoteCardModalSlice.isModalOpen);
    const node = useAppSelector((state) => state.NoteCardModalSlice.node);
    const nodes = useAppSelector((state) => state.interactiveMapSlice.nodes);

    return (
        <Modal
            show={isModalOpen}
            dismissible
            position='center'
            theme={modalTheme}
            onClose={() => {
                dispatch(setIsModalOpen(false));
                dispatch(setNodes([...nodes, node!]))
                updateNode(node!).then(() => dispatch(setNode(null)))
            }}
        >
            <Modal.Header className='pb-0'>
                Add message
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Set message text for selected block
                </p>
            </Modal.Header>
            <Modal.Body>
                <TextInput
                    theme={textInputTheme}
                    placeholder='Enter message'
                    defaultValue={node?.noteContent}
                    onChange={(e) => {
                        dispatch(setNode({...node!, noteContent: e.target.value}))
                    }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default NoteCardModal;