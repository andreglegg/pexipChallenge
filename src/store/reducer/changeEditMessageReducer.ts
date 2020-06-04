import Action from '../actionCreators/onChangeEditMessage';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const changeEditMessageReducer = (state: State, action: ActionType) => {

    return {
        ...state,
        editMessage: action.payload.message,
    };
};

changeEditMessageReducer.type = Action.TYPE;

export default changeEditMessageReducer;
