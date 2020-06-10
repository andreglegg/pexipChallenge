import {User} from '../../types/User';

const TYPE = 'onSynchronizeCurrentUser';

const onSynchronizeCurrentUser = (data: User) => ({
    type: TYPE,
    payload: {
        data,
    },
});

onSynchronizeCurrentUser.TYPE = TYPE;

export default onSynchronizeCurrentUser;
