import Action from '../actionCreators/onSynchronizeStates';
import {State} from "../../types/State";

const synchronizeStatesReducer = (state: State, action: any) => {
    return {
        ...state,
        messages: action.payload.data.messages,
        users: action.payload.data.users,
        currentUser: action.payload.data.currentUser || state.currentUser,
    };
};

synchronizeStatesReducer.type = Action.TYPE;

export default synchronizeStatesReducer;
