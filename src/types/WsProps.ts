import {User} from './User';
import {Message} from './Message';

export type WsProps = {
    readyState?: number | string
    message?: string
    send: Function
    ws?: WebSocket
};
