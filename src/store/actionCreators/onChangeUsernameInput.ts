const TYPE = 'changeUsernameInput';

const onUsernameInput = (input: string) => ({
    type: TYPE,
    payload: {
        input,
    },
});

onUsernameInput.TYPE = TYPE;

export default onUsernameInput;
