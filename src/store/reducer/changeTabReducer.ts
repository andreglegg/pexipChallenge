import Action from '../actionCreators/onChangeTab';
import {State} from "../../types/State";
import {ActionType} from "../../types/ActionType";

const changeTabReducer = (state: State, action: ActionType) => {
    return {
        ...state,
        activeTab: action.payload.tab,
    };
};

changeTabReducer.type = Action.TYPE;

export default changeTabReducer;
