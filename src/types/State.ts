import {Message} from "./Message";
import {User} from './User';

export interface State {
    messages: Array<Message>;
    users: Array<User>;
    currentUser: User;
    activeTab: string;
    chatInput: string;
    usernameInput: string;
    editMessage: Message;
    ws: WebSocket;
}
