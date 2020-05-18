import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import classNames from "classnames";
import EditBox from "./EditBox";

import styles from './MessageItem.module.scss';

const MessageItem = (props: any) => {
    const { currentUser } = useSelector((state: any) => state);
    const {user, date, message} = props;
    const isOwner = (currentUser.id === user.id);

    return(
        <div className={classNames(styles.MessageItem, 'pb-3')}>
            <div className={styles.MetaBox}>
                <span className="font-weight-bold mr-2">{user.name}</span><span>{date}</span>
                <span>{isOwner ? <EditBox {...message} /> : null}</span></div>
            <div>
                {message}
            </div>
        </div>
    )
}

export default MessageItem;
