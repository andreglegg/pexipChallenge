import {Message} from "../../types/Message";

const TYPE = 'changeEditMessage';

const onChangeEditMessage = (message: Message | string) => ({
    type: TYPE,
    payload: {
        message,
    },
});

onChangeEditMessage.TYPE = TYPE;

export default onChangeEditMessage;
