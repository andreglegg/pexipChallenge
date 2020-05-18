import SwitchReducer from 'reducer-patterns/SwitchReducer';

import defaultReducer from './defaultReducer';
import changeTabReducer from './changeTabReducer';
import changeChatInputReducer from './changeChatInputReducer';
import changeUsernameInputReducer from './changeUsernameInputReducer';
import synchronizeStatesReducer from './synchronizeStatesReducer';

const reducer = SwitchReducer(
    defaultReducer,
    changeTabReducer,
    changeChatInputReducer,
    changeUsernameInputReducer,
    synchronizeStatesReducer,
);

export default reducer;
