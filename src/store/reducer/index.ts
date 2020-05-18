import SwitchReducer from 'reducer-patterns/SwitchReducer';

import defaultReducer from './defaultReducer';
import changeTabReducer from './changeTabReducer';
import changeChatInput from './changeChatInput';

const reducer = SwitchReducer(
    defaultReducer,
    changeTabReducer,
    changeChatInput,
);

export default reducer;
