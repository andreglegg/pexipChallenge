import Action from '../actionCreators/onSynchronizeStates';

const synchronizeStatesReducer = (state: any, action: any) => {
    console.log('del msg: ', action.payload.data.messages);
    return {
        ...state,
        messages: action.payload.data.messages,
        users: action.payload.data.users,
        currentUser: action.payload.data.currentUser || state.currentUser,
    };
};

synchronizeStatesReducer.type = Action.TYPE;

export default synchronizeStatesReducer;
