import {State} from "../../types/State";

const defaultReducer = (state: State) => {

    return {
        ...state,
        messages: [],
        users: [],
        ws: new WebSocket('ws://localhost:4000'),
        activeTab: '2',
        chatInput: '',
        editMessage: [],
        usernameInput: '',
        currentUser: [],
    };
};

defaultReducer.type = 'default';

export default defaultReducer;
