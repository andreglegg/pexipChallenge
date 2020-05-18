import React, {useEffect} from 'react';

const MessageItem = (props: any) => {
    const {user, date, message} = props;
    return(
        <div className='pb-3'>
            <span className="font-weight-bold mr-2">{user.name}</span><span>{date}</span>
            <div>
                {message}
            </div>
        </div>
    )
}

export default MessageItem;
