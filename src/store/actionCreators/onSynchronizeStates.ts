import {User} from '../../types/User';
import {Message} from '../../types/Message';

const TYPE = 'onSynchronizeStates';

const onSynchronizeStates = (data: { currentUser: User; messages: Array<Message>; users: Array<User> }) => ({
    type: TYPE,
    payload: {
        data,
    },
});

onSynchronizeStates.TYPE = TYPE;

export default onSynchronizeStates;
