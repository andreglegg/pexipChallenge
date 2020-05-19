import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import classNames from "classnames";
import EditBox from "./EditBox";

import styles from './MessageItem.module.scss';
import EditInput from "../EditInput/EditInput";

const MessageItem = (props: any) => {
    const { currentUser, editMessage } = useSelector((state: any) => state);
    const {user, message} = props;
    const isOwner = (currentUser.id === user.id);

    const wasEdited = (message.createdAt !== message.updatedAt);

    const created = new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const updated = new Date(message.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    const renderMessage = message.isDeleted ? 'DELETED' : message.message;
    return(
        <div className={classNames(styles.MessageItem, 'pb-3')}>
            <div className={styles.MetaBox}>
                <span className="font-weight-bold mr-2">{user.name}</span>
                <span>{!wasEdited ? created : `${updated} Edited`}</span>
                <span>{isOwner ? <EditBox message={message} /> : null}</span></div>
            <div>
                {editMessage.id === message.id ? <EditInput /> : renderMessage}
            </div>
        </div>
    )
}

export default MessageItem;
