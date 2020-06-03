import {Message} from "./Message";
import {Tabs} from "./Tabs";
import {State} from "./State";
import {User} from "./User";

export type ActionType = {
    type: string;
    payload: {
        tab?: Tabs;
        input?: string;
        message?: Message;
        data?: any;
    };
}
