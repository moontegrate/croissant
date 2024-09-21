export interface GroupData {
    id: string,
    name: string
}

export interface InitialState {
    groups: GroupData[],
    groupsFilter: string | boolean;
};