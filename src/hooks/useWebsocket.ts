import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import onSynchronizeMessages from '../store/actionCreators/onSynchronizeMessages';
import onSynchronizeUsers from '../store/actionCreators/onSynchronizeUsers';
import onSynchronizeStates from '../store/actionCreators/onSynchronizeStates';
import onSynchronizeCurrentUser from '../store/actionCreators/onSynchronizeCurrentUser';
import {DataType} from '../enums';

function useWebsocket(url: string) {
    const ws = useMemo(() => new WebSocket(url), [url]);
    const [readyState, setReadyState] = useState(ws.readyState);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const send = useCallback((message) => {
        if (message === null || message === undefined) {
            return;
        }

        ws.send(message);
    }, [ws]);

    useEffect(() => {
        ws.onopen = () => {
            console.log('connected...');
            setReadyState(ws.readyState);
        }

        ws.onclose = () => {
            setReadyState(ws.readyState);
        }

        ws.onerror = () => {
            setReadyState(ws.readyState);
        }

        ws.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case DataType.initialData: {
                    console.log('initial data')
                    const formattedData = {
                        messages: data.messages,
                        users: data.users,
                        currentUser: data.currentUser,
                    }
                    dispatch(onSynchronizeStates(formattedData));
                    break;
                }
                case DataType.addMessage:
                case DataType.deleteMessage:
                case DataType.editMessage: {
                    console.log('onSynchronizeMessages')
                    dispatch(onSynchronizeMessages(data.messages));
                    break;
                }
                case DataType.addUser: {
                    console.log('onSynchronizeMessages')
                    if (data.currentUser) {
                        dispatch(onSynchronizeCurrentUser(data.currentUser));
                    }
                    dispatch(onSynchronizeUsers(data.users));
                    dispatch(onSynchronizeMessages(data.messages));
                    break;
                }
            }
            /*dispatch(onSynchronizeUsers(data.users));
            dispatch(onSynchronizeMessages(data.messages));*/

            console.log('data: ', data);
            setMessage(data);
        }

        return () => {
            ws.close();
        }
    }, [ws, dispatch]);

    return {
        readyState,
        message,
        send,
        ws,
    }
}

export default useWebsocket;
