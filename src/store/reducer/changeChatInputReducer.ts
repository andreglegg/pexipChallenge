import Action from '../actionCreators/onChangeChatInput';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const changeChatInputReducer = (state: State, action: ActionType) => {
    return {
        ...state,
        chatInput: action.payload.input,
    };
};

changeChatInputReducer.type = Action.TYPE;

export default changeChatInputReducer;
