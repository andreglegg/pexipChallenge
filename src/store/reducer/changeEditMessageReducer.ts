import Action from '../actionCreators/onChangeEditMessage';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const changeEditMessageReducer = (state: State, action: ActionType) => {
    console.log('action.payload.message: ', action.payload.message);
    return {
        ...state,
        editMessage: action.payload.message,
    };
};

changeEditMessageReducer.type = Action.TYPE;

export default changeEditMessageReducer;
