import { NodeData } from "../__base/interfaces"

export interface MessageCardData extends NodeData{
    text: string | null
    // text: {
    //     value: string,
    //     quickReplies: [
    //         {
    //             id: string,
    //             name: string,
    //             bindedTo: string
    //         }
    //     ]
    // } | null;
}