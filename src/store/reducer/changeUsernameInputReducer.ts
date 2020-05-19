import Action from '../actionCreators/onChangeUsernameInput';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const changeUsernameInputReducer = (state: State, action: ActionType) => {
    return {
        ...state,
        usernameInput: action.payload.input,
    };
};

changeUsernameInputReducer.type = Action.TYPE;

export default changeUsernameInputReducer;
