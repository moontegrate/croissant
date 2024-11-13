// Interfaces
import { NoteCardData } from "../FlowCards/NoteCard/interfaces"
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query";
import { NodeType } from "../FlowCards/__base/interfaces";

export interface NoteCardModalProps {
    refetch: () => QueryActionCreatorResult<QueryDefinition<string, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, NodeType[], "api">>
}

export interface InitialState {
    node: NoteCardData | null
};