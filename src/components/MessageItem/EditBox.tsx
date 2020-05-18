import React from 'react';
import {Button, ButtonGroup} from "reactstrap";
import styles from './MessageItem.module.scss'
import {useSelector} from "react-redux";

interface EditBoxProps {
    messageId: string;
}

const EditBox = (props: EditBoxProps) => {
    const { ws } = useSelector((state: any) => state);
    const { messageId } = props;

    const onDeleteMessage = () => {

        const messageToDelete = {
            id: messageId,
        }
        const data = {
            type: 'deleteMessage',
            payload: {...messageToDelete}
        }
        ws.send(JSON.stringify(data))
    }
    return(
        <ButtonGroup size="sm" className={styles.EditBox}>
            <Button>Edit</Button>
            <Button color="danger" onClick={() => onDeleteMessage()}>Delete</Button>
        </ButtonGroup>
    )
}

export default EditBox;
