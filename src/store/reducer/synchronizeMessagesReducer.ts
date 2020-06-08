import Action from '../actionCreators/onSynchronizeMessages';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const synchronizeMessagesReducer = (state: State, action: ActionType) => {

    return {
        ...state,
        messages: action.payload.data,
    };
};

synchronizeMessagesReducer.type = Action.TYPE;

export default synchronizeMessagesReducer;
