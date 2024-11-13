// Style import
import './index.scss';
import { modalTheme, textInputTheme } from '../../style/flowbiteThemes';

// Components
import { Modal, TextInput } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setNode } from './NoteCardModalSlice';
import { setNodes } from '../InteractiveMap/interactiveMapSlice';

// Server
import { useUpdateNodeMutation } from '../../api/apiSlice';

// Interfaces
import { NoteCardModalProps } from './interfaces';

// Notifications
import toast from 'react-hot-toast';

const NoteCardModal: React.FC<NoteCardModalProps> = ({refetch}) => {
    const dispatch = useAppDispatch();
    const node = useAppSelector((state) => state.noteCardModalSlice.node);
    const nodes = useAppSelector((state) => state.interactiveMapSlice.nodes);

    const [updateNode] = useUpdateNodeMutation();

    return (
        <Modal
            show={node !== null}
            dismissible
            position='center'
            theme={modalTheme}
            onClose={() => {
                dispatch(setNodes([...nodes, node!]))
                updateNode(node!).then(() => {
                    dispatch(setNode(null));
                    refetch()
                    .unwrap()
                    .then((data) => {
                        dispatch(setNodes(data));
                    })
                    .catch((error) => {
                        console.error(error);
                        toast('Oops! Something get wrong', {icon: '😰'});
                    });
                });
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
                    maxLength={100}
                    onChange={(e) => {
                        dispatch(setNode({...node!, noteContent: e.target.value}));
                    }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default NoteCardModal;