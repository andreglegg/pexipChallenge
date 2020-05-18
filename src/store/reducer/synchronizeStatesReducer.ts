import Action from '../actionCreators/onSynchronizeStates';

const synchronizeStatesReducer = (state: any, action: any) => {

    return {
        ...state,
        messages: action.payload.data.messages,
        users: action.payload.data.users,
        currentUser: action.payload.data.currentUser || state.currentUser,
    };
};

synchronizeStatesReducer.type = Action.TYPE;

export default synchronizeStatesReducer;
