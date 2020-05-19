import {State} from "../../types/State";

const defaultReducer = (state: State) => {

    return {
        ...state,
        messages: [],
        users: [],
        ws: new WebSocket('ws://192.168.86.191:4000'),
        activeTab: '2',
        chatInput: '',
        editMessage: [],
        usernameInput: '',
        currentUser: [],
    };
};

defaultReducer.type = 'default';

export default defaultReducer;
