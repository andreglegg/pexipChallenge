import Action from '../actionCreators/onChangeChatInput';

const changeChatInputReducer = (state: any, action: any) => {
    return {
        ...state,
        chatInput: action.payload.input,
    };
};

changeChatInputReducer.type = Action.TYPE;

export default changeChatInputReducer;
