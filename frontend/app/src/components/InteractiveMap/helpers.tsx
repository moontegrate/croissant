// Components
import MessageCard from '../FlowCards/MessageCard';
import ActionCard from '../FlowCards/ActionCard';
import ConditionCard from '../FlowCards/ConditionCard';
import NoteCard from '../FlowCards/NoteCard';

// Interfaces
import { NodeData } from './interfaces';

export function renderCardBody(node: NodeData): JSX.Element {
    switch (node.type) {
        case "Message":
            return (
                <MessageCard/>
            );
        case "Action":
            return (
                <ActionCard/>
            );
        case "Condition":
            return (
                <ConditionCard/>
            );
        case "Note":
            return (
                <NoteCard
                    node={node}
                />
            );
        default:
            return (
                <div>Error while card rendering</div>
            )
    };
};