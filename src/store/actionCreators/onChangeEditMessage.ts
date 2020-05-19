const TYPE = 'changeEditMessage';

const onChangeEditMessage = (message: string) => ({
    type: TYPE,
    payload: {
        message,
    },
});

onChangeEditMessage.TYPE = TYPE;

export default onChangeEditMessage;
