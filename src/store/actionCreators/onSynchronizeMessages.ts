import {Message} from '../../types/Message';

const TYPE = 'onSynchronizeMessages';

const onSynchronizeMessages = (data: Array<Message>) => ({
    type: TYPE,
    payload: {
        data,
    },
});

onSynchronizeMessages.TYPE = TYPE;

export default onSynchronizeMessages;
