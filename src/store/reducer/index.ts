import SwitchReducer from 'reducer-patterns/SwitchReducer';

import defaultReducer from './defaultReducer';
import changeTabReducer from './changeTabReducer';

const reducer = SwitchReducer(
    defaultReducer,
    changeTabReducer,
);

export default reducer;
