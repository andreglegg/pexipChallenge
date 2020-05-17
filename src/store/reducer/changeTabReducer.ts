import Action from '../actionCreators/onChangeTab';

const changeTabReducer = (state: any, action: any) => {
    return {
        ...state,
        activeTab: action.payload.tab,
    };
};

changeTabReducer.type = Action.TYPE;

export default changeTabReducer;
