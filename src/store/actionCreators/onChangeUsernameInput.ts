import {User} from "../../types/User";

const TYPE = 'changeUsernameInput';

const onUsernameInput = (input: User | string) => ({
    type: TYPE,
    payload: {
        input,
    },
});

onUsernameInput.TYPE = TYPE;

export default onUsernameInput;
