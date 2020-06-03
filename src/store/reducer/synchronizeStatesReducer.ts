import Action from '../actionCreators/onSynchronizeStates';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const synchronizeStatesReducer = (state: State, action: ActionType) => {

    const { messages, users, currentUser } = action.payload.data;
    return {
        ...state,
        messages: messages,
        users: users,
        currentUser: currentUser || state.currentUser,
    };
};

synchronizeStatesReducer.type = Action.TYPE;

export default synchronizeStatesReducer;
