import {Message} from "./Message";

export type ActionType = {
    type: string;
    payload: {
        tab: '1' | '2';
        input: string;
        message: Message;
    };
}
