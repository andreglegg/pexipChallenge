import Action from '../actionCreators/onChangeUsernameInput';

const changeUsernameInputReducer = (state: any, action: any) => {
    return {
        ...state,
        usernameInput: action.payload.input,
    };
};

changeUsernameInputReducer.type = Action.TYPE;

export default changeUsernameInputReducer;
