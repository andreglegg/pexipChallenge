import Action from '../actionCreators/onSynchronizeCurrentUser';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const synchronizeCurrentUserReducer = (state: State, action: ActionType) => {

    return {
        ...state,
        currentUser: action.payload.data,
    };
};

synchronizeCurrentUserReducer.type = Action.TYPE;

export default synchronizeCurrentUserReducer;
