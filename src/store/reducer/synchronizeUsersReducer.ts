import Action from '../actionCreators/onSynchronizeUsers';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const synchronizeUsersReducer = (state: State, action: ActionType) => {

    return {
        ...state,
        users: action.payload.data,
    };
};

synchronizeUsersReducer.type = Action.TYPE;

export default synchronizeUsersReducer;
