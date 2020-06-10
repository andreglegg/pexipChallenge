import {State} from "../../types/State";

const defaultReducer = (state: State) => {

    return {
        ...state,
        messages: [],
        users: [],
        activeTab: '2',
        chatInput: '',
        editMessage: [],
        usernameInput: '',
        currentUser: null,
    };
};

defaultReducer.type = 'default';

export default defaultReducer;
