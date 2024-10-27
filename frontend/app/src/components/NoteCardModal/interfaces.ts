import { NoteCardData } from "../FlowCards/NoteCard/interfaces"

export interface InitialState {
    isModalOpen: boolean,
    node: NoteCardData | null
};