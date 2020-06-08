import {User} from '../../types/User';

const TYPE = 'onSynchronizeUsers';

const onSynchronizeUsers = (data: Array<User>) => ({
    type: TYPE,
    payload: {
        data,
    },
});

onSynchronizeUsers.TYPE = TYPE;

export default onSynchronizeUsers;
