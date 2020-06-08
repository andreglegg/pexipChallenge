import {User} from './User';
import {Message} from './Message';

export type WsProps = {
    readyState?: number | string
    message?: {type: string; messages: Array<Message>, users: Array<User> }
    send: Function
    ws?: WebSocket
};
