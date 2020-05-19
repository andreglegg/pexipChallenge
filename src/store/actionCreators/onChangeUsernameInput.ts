import {User} from "../../types/User";

const TYPE = 'changeUsernameInput';

const onUsernameInput = (input: User) => ({
    type: TYPE,
    payload: {
        input,
    },
});

onUsernameInput.TYPE = TYPE;

export default onUsernameInput;
