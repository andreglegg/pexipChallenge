const defaultReducer = (state: any) => {

    return {
        ...state,
        chat: [],
        users: [],
        ws: new WebSocket('ws://localhost:4000'),
        activeTab: '1',
    };
};

defaultReducer.type = 'default';

export default defaultReducer;
