import React from 'react';
import {useSelector} from 'react-redux';
import {Anchorme} from 'react-anchorme';
import { ReactTinyLink } from 'react-tiny-link';
import classNames from 'classnames';

import { validURL, formatUrl, isDataURL } from '../../utils/UrlHelper';
import EditBox from './EditBox';
import EditInput from '../EditInput/EditInput';
import {State} from '../../types/State';
import {User} from '../../types/User';
import {Message} from '../../types/Message';

import styles from './MessageItem.module.scss';

interface IProps {
    user: User;
    message: Message;
    send: Function;
}

const MessageItem = (props: IProps) => {
    const currentUser = useSelector((state: State) => state.currentUser);
    const editMessage = useSelector((state: State) => state.editMessage);
    const {user, message, send} = props;
    const isOwner = currentUser ? (currentUser.id === user.id) : false;

    const wasEdited = (message.createdAt !== message.updatedAt);

    const created = new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const updated = new Date(message.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    //TODO: clean up this block
    let renderMessage = message.isDeleted ? 'DELETED' : (<Anchorme target='_blank' rel='noreferrer noopener'>{message.message}</Anchorme>);
    if (isDataURL(message.message)){
        renderMessage = <img src={message.message} alt='image' style={{'width': '100%'}} />
    }
    const firstLink = message.message.split(' ')
        .map((str) => validURL(str) ? str : false)
        .filter(item => item !== false)[0];

    const renderLinkPreview = firstLink ? <ReactTinyLink
        cardSize='small'
        showGraphic={true}
        maxLine={2}
        minLine={1}
        url={formatUrl(firstLink)}
    /> : null;

    return(
        <div className={classNames(styles.MessageItem, 'pb-3')}>
            <div className={styles.MetaBox}>
                <span className='font-weight-bold mr-2'>{user.name}</span>
                <span className={styles.Gray}>{!wasEdited ? created : `${updated} Edited`}</span>
                <span>{isOwner ? <EditBox message={message} send={send} /> : null}</span></div>
            <div className={(message.userId === '100' || message.isDeleted) ? styles.Gray : ''}>
                {editMessage.id === message.id ? <EditInput send={send} /> : renderMessage}
            </div>
            {renderLinkPreview}
        </div>
    )
}

export default MessageItem;
