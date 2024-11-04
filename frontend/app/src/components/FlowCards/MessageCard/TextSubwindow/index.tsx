// Style
import './index.scss';
import { GoTrash } from "react-icons/go";

// Interfaces
import { MessageCardData } from '../interfaces';

// Hooks
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../hooks/state';
import { setIsTextEditModal, setNodes, setTextEditingNode } from '../../../InteractiveMap/interactiveMapSlice';

// Server
import { useUpdateNodeMutation, useGetAutomationNodesQuery } from '../../../../api/apiSlice';


const TextSubwindow: React.FC<{node: MessageCardData, onClose: () => void}> = ({node, onClose}) => {
    const dispatch = useAppDispatch();

    const { automationId } = useParams();

    const nodes = useAppSelector((state) => state.interactiveMapSlice.nodes);
    const [isHover, setIsHover] = useState<boolean>(false);

    const [updateNode] = useUpdateNodeMutation();
    const { refetch } = useGetAutomationNodesQuery(automationId!);

    function deleteMessage(node: MessageCardData) {
        const item = nodes.find(i => i.id === node.id);

        updateNode({ ...item!, text: null })
        .then(() => refetch().then((data) => dispatch(setNodes(data.data!))));
    };

    return (
        <div className='flow-card__subwindow'>
            <div
                className='message-card__text'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {isHover ? <div className='message-card__text-delete-wrapper'>
                    <div
                        className='message-card__text-delete'
                        onClick={() => {
                            onClose();
                            deleteMessage(node);
                        }}
                    >
                        <GoTrash color='red'/>
                    </div>
                </div> : null}
                <div
                    onClick={() => {
                        dispatch(setIsTextEditModal(true));
                        dispatch(setTextEditingNode(node));
                    }}
                >
                    {node.text ? node.text : <p className='text-light-gray-text'>Enter message</p>}
                </div>
            </div>
            <button className='message-card__quick-reply-btn'>+ Add quick reply</button>
        </div>
    );
};

export default TextSubwindow