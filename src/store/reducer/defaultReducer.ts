import {State} from "../../types/State";
import config from '../../Config';

const defaultReducer = (state: State) => {

    return {
        ...state,
        messages: [],
        users: [],
        ws: new WebSocket(config.wsUrl),
        activeTab: '2',
        chatInput: '',
        editMessage: [],
        usernameInput: '',
        currentUser: [],
    };
};

defaultReducer.type = 'default';

export default defaultReducer;
