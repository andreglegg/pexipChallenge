import SwitchReducer from 'reducer-patterns/SwitchReducer';

import defaultReducer from './defaultReducer';
import changeTabReducer from './changeTabReducer';
import changeChatInputReducer from './changeChatInputReducer';
import changeEditMessageReducer from './changeEditMessageReducer';
import changeUsernameInputReducer from './changeUsernameInputReducer';
import synchronizeStatesReducer from './synchronizeStatesReducer';
import synchronizeMessagesReducer from './synchronizeMessagesReducer';
import synchronizeUsersReducer from './synchronizeUsersReducer';
import synchronizeCurrentUserReducer from './synchronizeCurrentUserReducer';

const reducer = SwitchReducer(
    defaultReducer,
    changeTabReducer,
    changeChatInputReducer,
    changeEditMessageReducer,
    changeUsernameInputReducer,
    synchronizeStatesReducer,
    synchronizeMessagesReducer,
    synchronizeUsersReducer,
    synchronizeCurrentUserReducer,
);

export default reducer;
