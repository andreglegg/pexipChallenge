const TYPE = 'changeChatInput';

const onChangeChatInput = (input: string) => ({
    type: TYPE,
    payload: {
        input,
    },
});

onChangeChatInput.TYPE = TYPE;

export default onChangeChatInput;
