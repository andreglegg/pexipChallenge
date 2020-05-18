const defaultReducer = (state: any) => {

    return {
        ...state,
        messages: [],
        users: [],
        ws: new WebSocket('ws://localhost:4000'),
        activeTab: '2',
        chatInput: '',
        usernameInput: '',
        currentUser: [],
    };
};

defaultReducer.type = 'default';

export default defaultReducer;
