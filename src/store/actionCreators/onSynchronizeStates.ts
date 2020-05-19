import {State} from "../../types/State";

const TYPE = 'onSynchronizeStates';

const onSynchronizeStates = (data: State) => ({
    type: TYPE,
    payload: {
        data,
    },
});

onSynchronizeStates.TYPE = TYPE;

export default onSynchronizeStates;
