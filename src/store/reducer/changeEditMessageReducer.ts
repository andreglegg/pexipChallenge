import Action from '../actionCreators/onChangeEditMessage';

const changeEditMessageReducer = (state: any, action: any) => {
    console.log('action.payload.message: ', action.payload.message);
    return {
        ...state,
        editMessage: action.payload.message,
    };
};

changeEditMessageReducer.type = Action.TYPE;

export default changeEditMessageReducer;
