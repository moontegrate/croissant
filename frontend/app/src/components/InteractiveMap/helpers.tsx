// Components
import MessageCard from '../FlowCards/MessageCard';
import ActionCard from '../FlowCards/ActionCard';
import ConditionCard from '../FlowCards/ConditionCard';
import NoteCard from '../FlowCards/NoteCard';

// Interfaces
import { NodeType } from './interfaces';
import { MessageCardData } from '../FlowCards/MessageCard/interfaces';
import { ConditionCardData } from '../FlowCards/ConditionCard/interfaces';
import { ActionCardData } from '../FlowCards/ActionCard/interfaces';
import { NoteCardData } from '../FlowCards/NoteCard/interfaces';

export function renderCardBody(node: NodeType): JSX.Element {
    switch (node.type) {
        case "Message":
            return (
                <MessageCard node={node as MessageCardData}/>
            );
        case "Action":
            return (
                <ActionCard node={node as ActionCardData}/>
            );
        case "Condition":
            return (
                <ConditionCard node={node as ConditionCardData}/>
            );
        case "Note":
            return (
                <NoteCard node={node as NoteCardData}/>
            );
        default:
            return (
                <div>Error while card rendering</div>
            )
    };
};